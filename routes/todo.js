const passport = require('passport');
const router = require('express').Router();
const { updateStatus, addNewList, getEditList, editList } = require('../controllers/todo');

const auth = passport.authenticate('jwt-user', { session: false });

router.patch('/updateStatus', auth, updateStatus);
router.post('/addNewList', auth, addNewList);
router.get('/getEditList/:list_id', auth, getEditList);
router.patch('/editList', auth, editList);

module.exports = router;
