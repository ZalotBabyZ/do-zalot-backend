const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtStrategyUser = new Strategy(option, async (payload, done) => {
  const targetUser = await db.User.findOne({ where: { id: payload.userId } });

  if (targetUser) {
    done(null, targetUser);
  } else {
    done(null, false);
  }
});

passport.use('jwt-user', jwtStrategyUser);
