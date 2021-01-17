const passport = require('passport');
const router = require('express').Router();
const {
  getProject,
  createProject,
  getPendingTeam,
  acceptTeamInvite,
  rejectTeamInvite,
  requestProject,
  cancelProjectRequest,
  getTeamRequest,
  acceptTeamRequest,
  rejectTeamRequest,
} = require('../controllers/project');

const auth = passport.authenticate('jwt-user', { session: false });

router.get('/getProject', auth, getProject);
router.post('/createProject', auth, createProject);
router.get('/getPendingTeam', auth, getPendingTeam);
router.get('/getTeamRequest/:id', auth, getTeamRequest);
router.patch('/acceptTeamInvite/:id', auth, acceptTeamInvite);
router.patch('/acceptTeamRequest/:id/:project_id', auth, acceptTeamRequest);
router.delete('/rejectTeamInvite/:id', auth, rejectTeamInvite);
router.delete('/rejectTeamRequest/:id/:project_id', auth, rejectTeamRequest);
router.delete('/cancelProjectRequest/:id', auth, cancelProjectRequest);
router.post('/requestProject/:id', auth, requestProject);

module.exports = router;
