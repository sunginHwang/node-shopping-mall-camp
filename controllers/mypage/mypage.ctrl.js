const models = require('../../models');

exports.getMyInfo = async ( req ,res) => {
    const user = req.user;
    res.render('mypage/edit.html', {user});
}

exports.edit = async ( req ,res) => {
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
}