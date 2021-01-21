const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/sendEmail');

const getProjectList = async (req, res) => {
  try {
    const projectList = await db.Team.findAll({
      where: {
        user_id: req.user.id,
        user_status: 'MEMBER',
      },
      attributes: ['user_role', 'user_pin', 'order'],
      include: {
        model: db.Project,
        attributes: ['id', 'project_name', 'description'],
        include: [
          {
            model: db.List,
            attributes: ['id', 'score', 'status'],
            include: {
              model: db.Assign,
              attributes: ['user_status', 'user_id'],
            },
          },
          {
            model: db.Config,
            attributes: ['project_color'],
          },
        ],
      },
    });

    const result = projectList.map((project) => {
      const lists = project.Project.Lists;
      const totalUserScore = lists.reduce((accum, list) => {
        return list.Assigns.find((assign) => assign.user_id === req.user.id && assign.user_status === 'UNDERTAKE')
          ? accum + list.score
          : accum;
      }, 0);

      const doneUserScore = lists.reduce((accum, list) => {
        return list.Assigns.find((assign) => assign.user_id === req.user.id && assign.user_status === 'UNDERTAKE') &&
          list.status === 'DONE'
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
        projectId: id,
        projectName: project_name,
        description,
        projectColor: project.Project.Config.project_color,
        userRole: user_role,
        totalProjectScore,
        doneProjectScore,
        totalUserScore,
        doneUserScore,
        userPin: user_pin,
        order,
      };
    });

    res.status(200).send({ userProject: { projectList: result, projectCount: result.length } });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

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
          userId: targetUser.id,
          userVip: targetUser.user_vip,
          username: targetUser.username,
          userColor: targetUser.user_color,
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
            include: [
              {
                model: db.List,
                attributes: ['id', 'score', 'status'],
                include: {
                  model: db.Assign,
                  attributes: ['user_status', 'user_id'],
                },
              },
              {
                model: db.Config,
                attributes: ['project_color'],
              },
            ],
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
            projectId: id,
            projectName: project_name,
            description,
            projectColor: project.Project.Config.project_color,
            userRole: user_role,
            totalProjectScore,
            doneProjectScore,
            totalUserScore,
            doneUserScore,
            userPin: user_pin,
            order,
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

const register = async (req, res) => {
  try {
    const { username, password, firstname, lastname, email, user_color, gender } = req.body;
    if (!username) {
      return res.status(400).send({ message: 'Username not exist' });
    }

    const targetUser = await db.User.findOne({ where: { username } });

    if (targetUser) {
      res.status(400).send({ message: 'Username already taken' });
    }

    if (!firstname) {
      return res.status(400).send({ message: 'First name not exist' });
    }
    if (!lastname) {
      return res.status(400).send({ message: 'Last name not exist' });
    }
    if (!password) {
      return res.status(400).send({ message: 'Password not exist' });
    }
    if (!email) {
      return res.status(400).send({ message: 'Email not exist' });
    }
    if (!user_color) {
      return res.status(400).send({ message: 'Color not exist' });
    }

    const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const user = await db.User.create({
      username,
      firstname,
      lastname,
      email,
      user_color,
      gender,
      image:
        'https://res.cloudinary.com/dmtmyh1hg/image/upload/v1608657166/default_pic/f7a299b9c1bf3b0e8a64b7e6a5124029_f20ayu.jpg',
      password: hashedPassword,
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword) {
      return res.status(400).send({ message: 'Old password not exist' });
    }
    if (!newPassword) {
      return res.status(400).send({ message: 'New password not exist' });
    }

    const isCorrect = await bcryptjs.compareSync(oldPassword, req.user.password);

    if (!isCorrect) {
      return res.status(400).send({ message: 'Incorrect old password' });
    }

    const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPassword = bcryptjs.hashSync(newPassword, salt);

    req.user.password = hashedPassword;
    await req.user.save();

    res.status(200).send({ message: 'Updated' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const targetUser = await db.User.findOne({ where: { email } });

    if (!targetUser) {
      return res.status(400).send({ message: 'email not found' });
    }

    const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPassword = bcryptjs.hashSync(targetUser.password, salt);

    targetUser.resetPasswordToken = hashedPassword;
    await targetUser.save();

    sendEmail({
      from: 'baobaozheng.si@gmail.com',
      to: email,
      subject: 'Forget password',
      text: `${process.env.FRONT_END_IP_ADDRESS}/forgotPassword?resetPasswordToken=${hashedPassword}`,
    });

    res.status(200).send({ message: 'token send' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  login,
  register,
  getProjectList,
  changePassword,
  resetPasswordToken,
};
