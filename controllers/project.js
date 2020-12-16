const db = require('../models');

const getProject = async (req, res) => {
  try {
    const { projectId } = req.query;
    // req.user.id

    if (!projectId) {
      return res.status(400).send({ message: 'Project ID not exist' });
    }

    const projects = await db.Project.findOne({
      where: { id: projectId },
      include: [
        { model: db.Team, where: { user_id: req.user.id, user_status: 'MEMBER' } },
        { model: db.Config },
        {
          model: db.Box,
          attribute: ['id', 'box_name', 'description', 'type', 'box_color', 'project_pin', 'order'],
          include: {
            model: db.List,
            attributes: [
              'id',
              'list',
              'description',
              'type',
              'status',
              'important',
              'score',
              'project_pin',
              'order',
              'list_deadline',
              'created_at',
              'updated_at',
            ],
            include: { model: db.Assign, attributes: ['id', 'user_status', 'updated_at'] },
          },
        },
      ],
    });

    const project = projects.dataValues;
    const config = projects.Config.dataValues;
    const team = projects.Teams[0].dataValues;
    const boxes = projects.Boxes;
    // project
    const projectName = project.project_name;
    const projectDescription = project.description;
    const projectVip = project.vip_until;
    const projectCreate = project.created_at;
    // const projectCreate = project.created_at.toISOString().slice(0, 10);
    const projectColor = config.project_color;
    const projectDeadLine = config.project_deadline;

    // user
    const userRole = team.user_role;
    const JoinAt = team.updated_at;
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

    res.status(200).send({
      boxes,
      user: { userRole, JoinAt },
      project: { projectName, projectDescription, projectVip, projectCreate, projectColor, projectDeadLine },
      right: { deleteProject, editScore, editConfig, editAssign, regressStatus, expelMember, approve },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getProject,
};
