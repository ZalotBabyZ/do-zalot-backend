const passport = require('passport');
const router = require('express').Router();
const { addNewComment, destroyComment } = require('../controllers/comment');

const auth = passport.authenticate('jwt-user', { session: false });

router.post('/addNewComment', auth, addNewComment);
router.delete('/destroyComment/:id', auth, destroyComment);

module.exports = router;
