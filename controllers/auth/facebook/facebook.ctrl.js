
exports.socialLoginSuccess = (req, res) => {
    res.send(req.user);
};

exports.socialLoginFail = (req, res) => {
    res.send('facebook login fail');
};
