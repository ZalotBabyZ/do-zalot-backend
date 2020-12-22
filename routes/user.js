const passport = require('passport');
const router = require('express').Router();
const { login, register, getProjectList } = require('../controllers/user');

const auth = passport.authenticate('jwt-user', { session: false });

router.post('/login', login);
router.post('/register', register);
router.get('/getProjectList', auth, getProjectList);

module.exports = router;
