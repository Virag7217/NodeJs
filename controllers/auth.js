const User = require('../models/user');


exports.getLogin = (req,res,next) => {
    // const isLoggedIn = req.get('Cookie').split('=')[1] === "true";
    console.log(req.session.isLoggedIn);
    
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated : false
    });
  };

  exports.postLogin = (req,res,next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    User.findById('63ec6b8dd50f22bbe3482fec')
    .then(user => {
        req.session.isLoggedin = true;
        req.session.user = user;
        res.redirect('/');
    })
    .catch(err => console.log(err));
  };