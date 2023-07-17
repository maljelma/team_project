let passport = require("passport");
// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayLoginPage = (req, res, next) =>
{
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayname: req.user ? req.user.displayname: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) =>
{
    passport.authenticate('local',
    (err, user, info) => {
        // server error
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/auth/login');
        }
        req.login(user, (err) => 
        {
            // server error
            if(err)
            {
                return next(err)
            }
            return res.redirect('/')
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>
{
    // if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayname: req.user ? req.user.displayname: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) =>
{
    // instantiate a  user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayname: req.body.displayname
    });

    User.register(newUser, req.body.password, (err) => 
    {
        if(err)
        {
            console.log("Error: Inserting New User");

            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                )
                console.log('Error: User Already Exists!')
            }

            return res.render('auth/register',{
                title: "Register",
                messages: req.flash('registerMessage'),
                displayname: req.user ? req.user.displayname: ''
            });
        }
        else
        {
            // if no error exists, then reigisteration is successful

            // redierect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            });
        }
    });
}

module.exports.preformLogout = (req, res, next) =>
{
    req.logout();
    res.redirect('/');
}