const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtStrategyStaff = new Strategy(option, async (payload, done) => {
  const targetUser = await db.Staff.findOne({ where: { id: payload.id } });

  if (targetUser) {
    done(null, targetUser);
  } else {
    done(null, false);
  }
});

const jwtStrategyMother = new Strategy(option, async (payload, done) => {
  const targetUser = await db.MotherProfile.findOne({ where: { id: payload.id } });

  if (targetUser) {
    done(null, targetUser);
  } else {
    done(null, false);
  }
});

passport.use('jwt-staff', jwtStrategyStaff);
passport.use('jwt-mother', jwtStrategyMother);
