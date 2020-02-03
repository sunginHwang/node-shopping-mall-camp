const express = require('express');
const models = require('../../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../../headers/passwordHash');
const ctrl = require('./accounts.ctrl');
const router = express.Router();

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {

        // 조회
        const user = await models.User.findOne({
            where: {
                username,
                password: passwordHash(password),
            },
            // attributes: { exclude: ['password'] }
        });

        // 유저에서 조회되지 않을시
        if (!user) {
            return done(null, false, {message: '일치하는 아이디 패스워드가 존재하지 않습니다.'});

            // 유저에서 조회 되면 세션등록쪽으로 데이터를 넘김
        } else {
            return done(null, user.dataValues);
        }

    }
));

passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    const result = user;
    result.password = "";
    console.log('deserializeUser');
    done(null, result);
});

router.get('/', ctrl.index);
router.get('/join', ctrl.goJoinPage);
router.post('/join', ctrl.join);
router.get('/login', ctrl.goLoginPage);
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/accounts/login',
    failureFlash: true
}), ctrl.login);

router.get('/success',ctrl.socialLoginSuccess);
router.get('/logout', ctrl.logout);

module.exports = router;


