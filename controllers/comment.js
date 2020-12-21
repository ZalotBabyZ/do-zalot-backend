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

module.exports = {
  addNewComment,
};
