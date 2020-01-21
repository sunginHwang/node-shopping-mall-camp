const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/accounts/login');
};

module.exports = {
    isAuthenticated
};