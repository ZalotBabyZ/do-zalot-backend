const db = require('../models');

const addNewComment = async (req, res) => {
  try {
    const { list_id, comment } = req.body;
    // req.user.id

    if (!list_id) {
      return res.status(400).send({ message: 'List ID not exist' });
    }
    if (!comment) {
      return res.status(400).send({ message: 'Comment not exist' });
    }

    //project_id
    const targetList = await db.Comment.create({ user_id: req.user.id, list_id, content: comment });

    res.status(200).send({ message: 'New comment success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const editComment = async (req, res) => {
  try {
    const { id, comment } = req.body;
    if (!id) {
      return res.status(400).send({ message: 'ID not exist' });
    }
    if (!comment) {
      return res.status(400).send({ message: 'Cannot sent blank field' });
    }

    const targetComment = await db.Comment.findOne({ where: { id, user_id: req.user.id } });

    if (!targetComment) {
      return res.status(404).send({ message: 'FAIL! Only comment owner can edit this.' });
    }

    targetComment.content = comment;
    await targetComment.save();

    return res.status(200).send({ message: 'updated' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const destroyComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: 'ID not exist' });
    }
    const targetComment = await db.Comment.findOne({ where: { id, user_id: req.user.id } });
    if (!targetComment) {
      return res.status(404).send({ message: 'FAIL! Only comment owner can delete this.' });
    }
    await targetComment.destroy();
    return res.status(200).send({ message: 'deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addNewComment,
  editComment,
  destroyComment,
};
