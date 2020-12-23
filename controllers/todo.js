const db = require('../models');
const { Op } = require('sequelize');

const updateStatus = async (req, res) => {
  try {
    const { listId, status, newBoxId } = req.body;
    // req.user.id

    if (!listId) {
      return res.status(400).send({ message: 'List ID not exist' });
    }
    if (!status) {
      return res.status(400).send({ message: 'Status not exist' });
    }
    if (!newBoxId) {
      return res.status(400).send({ message: 'New Box ID not exist' });
    }
    //project_id
    const targetList = await db.List.findOne({
      where: { id: listId },
      include: [
        {
          model: db.Project,
          // required: true,
          include: {
            model: db.Config,
            attributes: ['regress_right', 'regressable'],
            where: { [Op.or]: [{ regress_right: { [Op.eq]: req.user.id } }, { regressable: true }] },
          },
        },
        {
          model: db.Assign,
          required: false,
          where: { user_id: req.user.id, user_status: 'UNDERTAKE' },
        },
      ],
    });

    if (!targetList.Project && !targetList.Assigns[0])
      return res.status(401).send({ message: 'You have no right to set this todo status' });

    const targetBox = await db.List.findAll({ where: { box_id: newBoxId }, order: [['order', 'DESC']] });
    let order = 1;
    let projectPin = 0;
    if (targetBox.length) {
      order = targetList.box_id === newBoxId ? targetList.order : targetBox[0].order + 1;
    }
    if (targetList.project_pin > 0) {
      for (let i = 1; i <= 10; i++) {
        const targetList = targetBox.find((list) => list.project_pin === i);
        if (targetList) {
          targetList.project_pin = i - 1;
          await targetList.save();
        }
      }
      projectPin = 10;
    } else if (targetList.project_pin < 0) {
      for (let i = -1; i >= -10; i--) {
        const targetList = targetBox.find((list) => list.project_pin === i);
        if (targetList) {
          targetList.project_pin = i + 1;
          await targetList.save();
        }
      }
      projectPin = -10;
    }

    targetList.status = status;
    targetList.box_id = newBoxId;
    targetList.order = order;
    targetList.project_pin = projectPin;
    await targetList.save();
    res.status(200).send({ message: 'Todo status update' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const addNewList = async (req, res) => {
  try {
    const { box_id, project_id, type, status, list, description, pin, list_deadline, score } = req.body;
    // req.user.id

    if (!box_id) {
      return res.status(400).send({ message: 'Box ID not exist' });
    }
    if (!project_id) {
      return res.status(400).send({ message: 'Project ID not exist' });
    }
    if (!type) {
      return res.status(400).send({ message: 'Type not exist' });
    }
    let newScore;
    if (type === 'TODO') {
      if (!score) {
        return res.status(400).send({ message: 'Score not exist' });
      }
      newScore = score;
      if (!list_deadline) {
        return res.status(400).send({ message: 'Deadline not exist' });
      }
    } else {
      newScore = 0;
    }
    if (!status) {
      return res.status(400).send({ message: 'Status not exist' });
    }
    if (!list) {
      return res.status(400).send({ message: 'List not exist' });
    }

    const targetBox = await db.List.findAll({ where: { box_id }, order: [['order', 'DESC']] });
    let order = 1;
    if (targetBox.length > 0) {
      order = targetBox[0].order + 1;
    }

    let project_pin = 0;

    if (pin === 'pinTop') {
      for (let i = 1; i <= 10; i++) {
        const targetList = targetBox.find((list) => list.project_pin === i);
        if (targetList) {
          targetList.project_pin = i - 1;
          await targetList.save();
        }
      }
      project_pin = 10;
    } else if (pin === 'pinBottom') {
      for (let i = -1; i >= -10; i--) {
        const targetList = targetBox.find((list) => list.project_pin === i);
        if (targetList) {
          targetList.project_pin = i + 1;
          await targetList.save();
        }
      }
      project_pin = -10;
    }

    const targetList = await db.List.create({
      box_id,
      project_id,
      type,
      status,
      list,
      description,
      score: newScore,
      project_pin,
      order,
      list_deadline: list_deadline ? new Date(list_deadline) : undefined,
    });

    await db.Assign.create({ user_id: req.user.id, list_id: targetList.id, user_status: 'UNDERTAKE' });

    return res.status(201).send({ message: 'New List already create' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const getEditList = async (req, res) => {
  try {
    const { list_id } = req.params;

    if (!list_id) {
      res.status(400).send({ message: 'List ID not exist' });
    }

    const targetList = await db.List.findOne({
      where: { id: list_id },
      include: [
        {
          model: db.Comment,
        },
        {
          model: db.Assign,
        },
      ],
    });

    return res.status(200).send(targetList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const editList = async (req, res) => {
  try {
    const { list_id, list, deadline, score, description } = req.body;

    if (!list_id) {
      return res.status(400).send({ message: 'List ID not exist' });
    }
    if (!list) {
      return res.status(400).send({ message: 'List not exist' });
    }
    // if (!deadline) {
    //   return res.status(400).send({ message: 'Deadline not exist' });
    // }
    // if (!score) {
    //   res.status(400).send({ message: 'Score not exist' });
    // }

    const targetList = await db.List.findOne({
      where: { id: list_id },
    });

    if (!targetList) {
      return res.status(404).send({ message: 'Target list not found' });
    }

    if (targetList.type === 'TODO' && !score) {
      return res.status(400).send({ message: 'Score not exist' });
    }

    targetList.list = list;
    if (deadline) {
      targetList.list_deadline = deadline;
    }
    targetList.score = score;
    targetList.description = description;
    await targetList.save();

    return res.status(200).send(targetList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  updateStatus,
  addNewList,
  getEditList,
  editList,
};
