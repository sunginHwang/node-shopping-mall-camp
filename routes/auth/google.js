const express = require('express');
const router = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const models = require('../../models');

const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SITE_DOMAIN}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const username = `fb_${profile.id}`;

            // 존재하는지 체크
            const exist = await models.User.count({
                where: {
                    // 아이디로 조회를 해봅니다.
                    username
                }
            });

            if (!exist) {
                // 존재하면 바로 세션에 등록
                user = await models.User.create({
                    username,
                    displayname: profile.displayName,
                    password: username + new Date()
                });
            } else {
                user = await models.User.findOne({
                    where: {
                        username
                    }
                });
            }

            return cb(null, user);

        } catch (e) {
            console.log(e);
        }
    }
));

router.get('/', passport.authenticate('google', {scope: 'email'}));


//인증후 페이스북에서 이 주소로 리턴해줌. 상단에 적은 callbackURL과 일치
router.get('/callback',
    passport.authenticate('google',
        {
            successRedirect: '/',
            failureRedirect: '/auth/google/fail'
        }
    )
);

//로그인 성공시 이동할 주소
router.get('/success', (req, res) => {
    res.send(req.user);
});

router.get('/fail', (req, res) => {
    res.send('google login fail');
});


module.exports = router;