const db = require('../models');
// const sequelize = require('sequelize');

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
            ['user_status', 'userStatus'],
            ['user_role', 'userRole'],
            ['created_at', 'createdAt'],
          ],
          include: { model: db.User, attributes: ['username', 'image', ['user_color', 'color']] },
        },
        { model: db.Config },
        {
          model: db.Box,
          attributes: [
            'id',
            ['box_name', 'name'],
            'description',
            'type',
            ['box_color', 'color'],
            ['project_pin', 'projectPin'],
            'order',
          ],
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
              ['project_pin', 'projectPin'],
              'order',
              ['list_deadline', 'listDeadline'],
              ['created_at', 'createdAt'],
              ['updated_at', 'updatedAt'],
            ],
            include: {
              model: db.Assign,
              attributes: ['id', ['user_status', 'userStatus'], ['updated_at', 'updatedAt']],
            },
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

    // boxes
    // const boxes = Boxes.map((box) => {
    //   const { id, name, description, type, color, projectPin, order, Lists } = box.dataValues;
    //   return { id, name, description, type, color, projectPin, order, lists: Lists.dataValues };
    // });
    res.status(200).send({
      project: { name, description, vip, createdAt, color, deadline },
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

module.exports = {
  getProject,
};
