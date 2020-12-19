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
      return res.status(401).send({ message: 'คุณไม่ได้รับอนุญาตให้แก้ไข progress ของ todolist นี้' });
    targetList.status = status;
    targetList.box_id = newBoxId;
    await targetList.save();
    res.status(200).send({
      boxId: targetList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
const addNewList = async (req, res) => {
  try {
    const { box_id, project_id, type, status, list, description, score, pin, list_deadline } = req.body;
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
    if (type === 'TODO') {
      if (!score) {
        return res.status(400).send({ message: 'Score not exist' });
      }
      if (!list_deadline) {
        return res.status(400).send({ message: 'Deadline not exist' });
      }
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
      for (let i = 1; i <= 3; i++) {
        const targetList = targetBox.find((list) => list.project_pin === i);
        if (targetList) {
          targetList.project_pin = i - 1;
          await targetList.save();
        }
      }
      project_pin = 3;
    } else if (pin === 'pinBottom') {
      for (let i = -1; i >= -3; i--) {
        const targetList = targetBox.find((list) => list.project_pin === i);
        console.log(targetList);
        if (targetList) {
          targetList.project_pin = i + 1;
          console.log(targetList.project_pin);
          await targetList.save();
        }
      }
      project_pin = -3;
    }

    const targetList = await db.List.create({
      box_id,
      project_id,
      type,
      status,
      list,
      description,
      score,
      project_pin,
      order,
      list_deadline: new Date(list_deadline),
    });
    return res.status(201).send({ message: 'New List already create' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  updateStatus,
  addNewList,
};
