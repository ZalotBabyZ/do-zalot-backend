const passport = require('passport');
const router = require('express').Router();
const { getProject, createProject, getPendingAssign } = require('../controllers/project');

const auth = passport.authenticate('jwt-user', { session: false });

router.get('/getProject', auth, getProject);
router.post('/createProject', auth, createProject);
router.get('/getPendingAssign', auth, getPendingAssign);

module.exports = router;
