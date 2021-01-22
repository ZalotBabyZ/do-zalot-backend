const passport = require('passport');
const router = require('express').Router();
const {
  login,
  register,
  getProjectList,
  changePassword,
  resetPasswordToken,
  resetPassword,
} = require('../controllers/user');

const auth = passport.authenticate('jwt-user', { session: false });

router.post('/login', login);
router.post('/register', register);
router.patch('/resetPasswordToken', resetPasswordToken);
router.patch('/resetPassword', resetPassword);
router.get('/getProjectList', auth, getProjectList);
router.patch('/changePassword', auth, changePassword);

module.exports = router;
