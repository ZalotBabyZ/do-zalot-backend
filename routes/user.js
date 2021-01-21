const passport = require('passport');
const router = require('express').Router();
const { login, register, getProjectList, changePassword, resetPasswordToken } = require('../controllers/user');

const auth = passport.authenticate('jwt-user', { session: false });

router.post('/login', login);
router.post('/register', register);
router.patch('/resetPasswordToken', resetPasswordToken);
router.get('/getProjectList', auth, getProjectList);
router.patch('/changePassword', auth, changePassword);

module.exports = router;
