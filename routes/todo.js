const passport = require('passport');
const router = require('express').Router();
const { updateStatus } = require('../controllers/todo');

const auth = passport.authenticate('jwt-user', { session: false });

router.patch('/updateStatus', auth, updateStatus);

module.exports = router;
