const passport = require('passport');
const dotenv = require('dotenv');
const facebook = require('./facebook');
const google = require('./google');
const { Router } = require('express');
const router = Router();

dotenv.config(); // LOAD CONFIG

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.use('/facebook', facebook);
router.use('/google', google);



module.exports = router;