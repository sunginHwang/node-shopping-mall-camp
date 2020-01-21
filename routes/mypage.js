const express = require('express');
const router = express.Router();
const models = require('../models');
const {isAuthenticated} = require('../middleware/auth');

router.get('/edit', isAuthenticated, (req, res) => {
    const user = req.user;
    res.render('mypage/edit.html', {user});
});

router.post('/edit', isAuthenticated, async (req, res) => {
    const user = Object.assign({}, req.user);
    user.displayname = req.body.displayname;

    try {
        await models.User.update(
            user,
            {
                where: {id: user.id}
            }
        );

        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.render('mypage/edit.html', {user});
        });
    } catch (e) {

    }

});

module.exports = router;