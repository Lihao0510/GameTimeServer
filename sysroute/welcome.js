const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checklogin').checkLogin;


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});

router.get('/register', function (req, res, next) {
    res.render('register');
});

router.get('/homepage', checkLogin, function (req, res, next) {
    res.render('index', {usermessage: req.session.user});
});


module.exports = router;
