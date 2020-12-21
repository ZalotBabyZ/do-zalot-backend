const passport = require('passport');
const router = require('express').Router();
const { addNewComment } = require('../controllers/comment');

const auth = passport.authenticate('jwt-user', { session: false });

router.post('/addNewComment', auth, addNewComment);

module.exports = router;
