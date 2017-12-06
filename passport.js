var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var userdetails = require('./userschema');
var secret = 'thisisfuckingsecret';

module.exports = function(passport){
	var opts = {};
	opts.secretOrKey = secret;
	opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();  
	//console.log(passport)
	passport.use(new JwtStrategy(opts,function(payload,done){
		userdetails.aggregate({$unwind:"$users"},
								{$unwind:"$users.userdetail"},
								  {$match:{"users.userdetail.email":payload[0].users.userdetail.email}},
								  {$project:{"users":"$users"}},function(err,data){
								  	if(err){
											done(err,false);
										}
										if(data){
											console.log(data[0])
											done(null,data);
										}else{

											done(null,false);
										}
									
								  })
		//userdetails.findOne({"users.userdetail.firstname":payload[0].users.userdetail.firstname},function(err,data){
			
		
	}))
};