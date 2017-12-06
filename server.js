var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
//var bcrypt = require('bcrypt');
var passport = require('passport');
var jwt = require('jwt-simple');
//var router = express.Router();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname +'/public'))
app.use(morgan('dev'));



var router = require('./router');


//app.get('/getinfo',passport.authenticate('jwt',{session:false}),sample.getinfo)

app.use(router)

require('./passport')(passport);

app.use(passport.initialize());


app.listen(process.env.PORT || 8002);
console.log("listening to 8002")