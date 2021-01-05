const db = require('../models');
const { Op } = require('sequelize');

const getProject = async (req, res) => {
  try {
    const { projectId } = req.query;
    // req.user.id

    if (!projectId) {
      return res.status(400).send({ message: 'Project ID not exist' });
    }

    const isMember = await db.Project.findOne({
      where: { id: projectId },
      include: { model: db.Team, where: { user_id: req.user.id, user_status: 'MEMBER' } },
    });

    if (!isMember) {
      const project = await db.Project.findOne({
        where: { id: projectId },
        attributes: [['project_name', 'name'], 'description', ['vip_until', 'vip'], ['created_at', 'createdAt']],
        include: {
          model: db.Team,
          attributes: [
            ['user_status', 'userStatus'],
            ['user_role', 'userRole'],
            ['created_at', 'createdAt'],
          ],
          include: { model: db.User, attributes: ['username', 'image', ['user_color', 'color']] },
        },
      });

      return res.status(200).send({ project });
    }

    const projects = await db.Project.findOne({
      where: { id: projectId },
      attributes: [['project_name', 'name'], 'description', ['vip_until', 'vip'], ['created_at', 'createdAt']],
      include: [
        {
          model: db.Team,
          attributes: [
            ['user_id', 'id'],
            ['user_status', 'userStatus'],
            ['user_role', 'userRole'],
            ['created_at', 'createdAt'],
          ],
          include: { model: db.User, attributes: ['username', 'image', ['user_color', 'color']] },
        },
        { model: db.Config },
        {
          model: db.Box,
          attributes: ['id', 'box_name', 'description', 'type', ['box_color', 'color'], 'project_pin', 'order'],
          include: {
            model: db.List,
            attributes: [
              ['box_id', 'boxId'],
              'id',
              'list',
              'description',
              'type',
              'status',
              'important',
              'score',
              'project_pin',
              'order',
              ['list_deadline', 'listDeadline'],
              ['created_at', 'createdAt'],
              ['updated_at', 'updatedAt'],
            ],
            include: [
              {
                model: db.Assign,
                attributes: [
                  ['user_id', 'id'],
                  ['user_status', 'userStatus'],
                  ['updated_at', 'updatedAt'],
                ],
              },
              {
                model: db.Comment,
                attributes: [['updated_at', 'updatedAt']],
              },
            ],
          },
        },
      ],
    });
    const config = projects.Config.dataValues;
    const user = isMember.Teams[0].dataValues;

    // project
    const { name, description, vip, createdAt, Teams, Boxes } = projects.dataValues;
    // const projectCreate = project.created_at.toISOString().slice(0, 10);
    const color = config.project_color;
    const deadline = config.project_deadline;

    const boxTodo = Boxes.reduce((acc, box) => {
      return box.type !== 'TODO' ? acc : [...acc, { id: box.id, name: box.box_name }];
    }, []);
    const boxDoing = Boxes.reduce((acc, box) => {
      return box.type !== 'DOING' ? acc : [...acc, { id: box.id, name: box.box_name }];
    }, []);
    const boxDone = Boxes.reduce((acc, box) => {
      return box.type !== 'DONE' ? acc : [...acc, { id: box.id, name: box.box_name }];
    }, []);
    // user
    const role = user.user_role;
    const joinAt = user.updated_at;
    // const JoinAt = team.updated_at.toISOString().slice(0, 10);

    // user right
    const deleteProject = config.delete_right === req.user.id;
    const editScore = config.editable_score || config.edit_score_right === req.user.id;
    const editConfig = config.editable_config || config.edit_config_right === req.user.id;
    const editAssign = config.editable_assign || config.edit_assign_right === req.user.id;
    const regressStatus = config.regressable || config.regress_right === req.user.id;
    const expelMember = config.expelable || config.expel_right === req.user.id;
    const approve =
      config.approve_by_a === req.user.id || config.approve_by_b === req.user.id || config.approve_by_c === req.user.id;

    Boxes.forEach((box) => {
      box.Lists.sort((a, b) => b.project_pin - a.project_pin || a.order - b.order);
    });
    Boxes.sort((a, b) => b.project_pin - a.project_pin || a.order - b.order);

    res.status(200).send({
      project: {
        name,
        description,
        vip,
        createdAt,
        color,
        deadline,
        box: { TODO: boxTodo, DOING: boxDoing, DONE: boxDone },
      },
      user: { role, joinAt },
      right: { deleteProject, editScore, editConfig, editAssign, regressStatus, expelMember, approve },
      teams: Teams,
      boxes: Boxes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { user_role, project_color, project_name, memberList, description, project_deadline } = req.body;
    if (!user_role) {
      return res.status(400).send({ message: 'Role not exist' });
    }
    if (!project_color) {
      return res.status(400).send({ message: 'Project color not exist' });
    }
    if (!project_name) {
      return res.status(400).send({ message: 'project name not exist' });
    }
    if (!memberList) {
      return res.status(400).send({ message: 'Member list not exist' });
    }
    if (!project_deadline) {
      return res.status(400).send({ message: 'Deadline not exist' });
    }

    const targetProject = await db.Project.create({ project_name, description });
    await db.Config.create({
      project_id: targetProject.id,
      project_deadline,
      project_color,
      delete_right: req.user.id,
      edit_config_right: req.user.id,
      edit_score_right: req.user.id,
      edit_assign_right: req.user.id,
      regress_right: req.user.id,
      expel_right: req.user.id,
    });
    await db.Box.bulkCreate([
      {
        project_id: targetProject.id,
        box_name: 'TODO BOX',
        description: 'todo',
        type: 'TODO',
        box_color: 'var(--thirdaryDarkest-color)',
        project_pin: 0,
        order: 1,
      },
      {
        project_id: targetProject.id,
        box_name: 'DOING BOX',
        description: 'doing',
        type: 'DOING',
        box_color: 'var(--thirdary-color)',
        project_pin: 0,
        order: 2,
      },
      {
        project_id: targetProject.id,
        box_name: 'DONE BOX',
        description: 'done',
        type: 'DONE',
        box_color: 'var(--secondary-color)',
        project_pin: 0,
        order: 3,
      },
      {
        project_id: targetProject.id,
        box_name: 'RESOURCE',
        description: 'resource pic etc.',
        type: 'NOTE',
        box_color: 'var(--primary-color)',
        project_pin: 3,
        order: 4,
      },
      {
        project_id: targetProject.id,
        box_name: 'NOTE',
        description: 'not important note',
        type: 'NOTE',
        box_color: 'var(--primary-color)',
        project_pin: -3,
        order: 5,
      },
    ]);

    await db.Team.create({
      project_id: targetProject.id,
      user_id: req.user.id,
      user_role: user_role,
      user_status: 'MEMBER',
      order: '0',
    });

    memberList.forEach(async (member) => {
      if (member.username) {
        const targetUser = await db.User.findOne({ where: { username: member.username } });
        if (targetUser) {
          await db.Team.create({
            project_id: targetProject.id,
            user_id: targetUser.id,
            user_role: 'TEAM_MEMBER',
            user_status: 'INVITED',
            order: '0',
          });
        }
      }
    });
    res.status(201).send({ message: 'create new project' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const getPendingTeam = async (req, res) => {
  try {
    const user_id = req.user.id;

    const inviteList = await db.Team.findAll({
      where: { user_id, user_status: 'INVITED' },
      include: { model: db.Project, attributes: [['project_name', 'name']] },
      attributes: ['id', ['user_status', 'status'], 'created_at'],
    });
    const requestList = await db.Team.findAll({
      where: { user_id, user_status: 'REQUEST_TO_JOIN' },
      include: { model: db.Project, attributes: [['project_name', 'name']] },
      attributes: ['id', ['user_status', 'status'], 'created_at'],
    });

    res.status(200).send({ inviteList, requestList });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const acceptTeamInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const inviteList = await db.Team.findOne({
      where: { user_id, id, user_status: 'INVITED' },
    });

    if (!inviteList) {
      return res.status(400).send({ message: 'Cannot accept this request' });
    }

    inviteList.user_status = 'MEMBER';
    inviteList.save();

    res.status(200).send({ message: 'updated' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
const rejectTeamInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const inviteList = await db.Team.findOne({
      where: { user_id, id, user_status: 'INVITED' },
    });

    if (!inviteList) {
      return res.status(400).send({ message: 'Cannot reject this request' });
    }

    await inviteList.destroy();

    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
const requestProject = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const targetProject = await db.Team.findOne({
      where: { user_id, project_id: id },
    });

    if (targetProject) {
      if (targetProject.user_status !== 'FORMER_MEMBER') {
        return res.status(400).send({ message: 'Cannot send this request' });
      }
      targetProject.user_status = 'REQUEST_TO_JOIN';
      await targetProject.save();
      return res.status(200).send({ message: 'request send' });
    }

    await db.Team.create({
      user_role: 'TEAM_MEMBER',
      user_status: 'REQUEST_TO_JOIN',
      order: '0',
      project_id: id,
      user_id,
    });

    res.status(201).send({ message: 'request send' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getProject,
  createProject,
  getPendingTeam,
  acceptTeamInvite,
  rejectTeamInvite,
  requestProject,
};
