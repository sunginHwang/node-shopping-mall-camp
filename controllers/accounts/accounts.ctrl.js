const models = require('../../models');


exports.index = ( _ , res) => {
    res.send('account app');
};

exports.goJoinPage = ( _ , res) => {
    res.render('accounts/join.html');
};

exports.join = async(req, res) => {
    try{
        await models.User.create(req.body);
        res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');
    }catch(e){
        console.log(e);
    }
};

exports.goLoginPage = (req, res) => {
    res.render('accounts/login.html', { flashMessage : req.flash().error });
};

exports.login = ( _ , res) => {
    res.send('<script>alert("로그인 성공");location.href="/";</script>');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/accounts/login');
};

exports.socialLoginSuccess = (req, res) => {
    res.send(req.user);
};