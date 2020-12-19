const passport = require('passport');
const router = require('express').Router();
const { updateStatus, addNewList } = require('../controllers/todo');

const auth = passport.authenticate('jwt-user', { session: false });

router.patch('/updateStatus', auth, updateStatus);
router.post('/addNewList', auth, addNewList);

module.exports = router;
