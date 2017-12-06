var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
// mongoose.connect('mongodb://localhost/carddetails',{useMongoClient:true});
mongoose.connect('mongodb://details:carduserdetails@ds129796.mlab.com:29796/carddetails',{useMongoClient:true});


var card = require('./cardroute')
var user = require('./userroute')
// app.use(sample)(sam)
router.get('/carddetail',card.carddetail);
router.get('/querydata',card.querydata)
router.post('/newuser',user.newuser)
router.post('/login',user.login)
router.get('/userinfo',passport.authenticate('jwt',{session:false}),user.userinfo)
router.post('/update',user.update)


module.exports = router;