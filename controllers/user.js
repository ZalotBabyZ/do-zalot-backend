const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).send({ message: 'Username not exist' });
    }

    if (!password) {
      return res.status(400).send({ message: 'Password not exist' });
    }

    const targetUser = await db.User.findOne({ where: { username } });

    if (!targetUser) {
      res.status(400).send({ message: 'Incorrect username or password' });
    } else {
      const isCorrect = await bcryptjs.compareSync(password, targetUser.password);

      if (!isCorrect) {
        res.status(400).send({ message: 'Incorrect username or password' });
      } else {
        const payload = {
          id: targetUser.id,
          userVip: targetUser.user_vip,
          username: targetUser.username,
          createAt: new Date(),
        };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 86400 });

        const projectList = await db.Team.findAll({
          where: {
            user_id: targetUser.id,
            user_status: 'MEMBER',
          },
          attributes: ['user_role', 'user_pin', 'order'],
          include: {
            model: db.Project,
            attributes: ['id', 'project_name', 'description'],
            include: {
              model: db.List,
              attributes: ['id', 'score', 'status'],
              include: {
                model: db.Assign,
                attributes: ['user_status', 'user_id'],
              },
            },
          },
        });

        const result = projectList.map((project) => {
          const lists = project.Project.Lists;

          const totalUserScore = lists.reduce((accum, list) => {
            return list.Assigns.find((assign) => assign.user_id === targetUser.id && assign.user_status === 'UNDERTAKE')
              ? accum + list.score
              : accum;
          }, 0);

          const doneUserScore = lists.reduce((accum, list) => {
            return list.Assigns.find(
              (assign) => assign.user_id === targetUser.id && assign.user_status === 'UNDERTAKE'
            ) && list.status === 'DONE'
              ? accum + list.score
              : accum;
          }, 0);

          const totalProjectScore = lists.reduce((accum, list) => {
            return list.score ? accum + list.score : accum;
          }, 0);

          const doneProjectScore = lists.reduce((accum, list) => {
            return list.score && list.status === 'DONE' ? accum + list.score : accum;
          }, 0);

          const { user_role, user_pin, order } = project;
          const { id, project_name, description } = project.Project;
          return {
            user_role,
            user_pin,
            order,
            project_id: id,
            project_name,
            description,
            totalProjectScore,
            doneProjectScore,
            totalUserScore,
            doneUserScore,
          };
        });

        res.status(200).send({ token, userProject: { projectList: result, projectCount: result.length } });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  login,
};
