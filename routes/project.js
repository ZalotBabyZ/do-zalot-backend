const passport = require('passport');
const router = require('express').Router();
const { getProject } = require('../controllers/project');

const auth = passport.authenticate('jwt-user', { session: false });

router.get('/getProject', auth, getProject);

module.exports = router;
