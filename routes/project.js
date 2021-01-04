const passport = require('passport');
const router = require('express').Router();
const {
  getProject,
  createProject,
  getPendingTeam,
  acceptTeamInvite,
  rejectTeamInvite,
} = require('../controllers/project');

const auth = passport.authenticate('jwt-user', { session: false });

router.get('/getProject', auth, getProject);
router.post('/createProject', auth, createProject);
router.get('/getPendingTeam', auth, getPendingTeam);
router.patch('/acceptTeamInvite/:id', auth, acceptTeamInvite);
router.delete('/rejectTeamInvite/:id', auth, rejectTeamInvite);

module.exports = router;
