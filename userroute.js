var express = require('express');
var jwt = require('jwt-simple');

var userdetails = require('./userschema');
var secret = 'thisisfuckingsecret';

exports.newuser = function(req,res,next){
	//	console.log(req.body.firstname)
		// var newuser = new userdetails({
		// users:[{

		// userdetail:[{
		// 	firstname:req.body.firstname,
		// 	lastname:req.body.lastname,
		// 	email:req.body.email,
		// 	password:req.body.password,
		// 	confirmpassword:req.body.confirmpassword


		// }]
		// }]
		// })
		// newuser.save(function(err,data){
		// 	if(err)throw err;
		// 	console.log(err)
		// 	res.json(data)
		// })
	if(!req.body.firstname || !req.body.lastname ||!req.body.email ||!req.body.password){
		console.log("enter details");
		res.send({success:false,msg:"enter details"})
	}else{
		userdetails.findOneAndUpdate({_id:"59fc9a1361648c05a81f2935"},
			{$push:
				{"users":
					{
					"userdetail":{
								firstname:req.body.firstname,
								lastname:req.body.lastname,
						 		email:req.body.email,
								password:req.body.password,
						 		confirmpassword:req.body.confirmpassword
									}

					}
				}

			},{runValidator : true,context:'query',new:true},function(err,data){
				if(err){
					res.send({success:false,msg:"user already exist",exist:true,err})
				}else{
					 res.json({success:true,msg:"pass hashed and added successful",exist:false,data});

					}
			})
	}

}

exports.login = function(req,res,next){
	if(!req.body.email || !req.body.password ){
		res.json({msg:"Enter the details",success:false})
		}else{
		userdetails.aggregate(
					{$unwind:"$users"},
					{$unwind:"$users.userdetail"},
					{$match:{"users.userdetail.email":req.body.email}},
					{$project:{_id:0,"users":"$users"}},
					function(err,user){
						if(err || user.length === 0){
							 res.json({msg:"No user data found",success:false,user:false})

						}else{
								var users = new userdetails();
								var pass = user[0].users.userdetail.password;
								users.comparepassword(req.body.password,pass,function(err,isMatch){
									if(!err && isMatch){
										var token = jwt.encode(user,secret);
										res.json({success:true,exist:true,msg:"autentication success",user,token:'Bearer '+token,isMatch})
										//console.log(req.headers)
									}else{
										res.json({success:false,exist:true,msg:"autentication failed!!!!wrong password",isMatch})

									}
								})
						}
							
						

					})

	}
}

exports.userinfo = function(req,res,next){
	var token = getToken(req.headers);
	var decode = jwt.decode(token,secret);
	if(token){
		res.json({success:true,msg:"can access data with token",decode})
	}else{
		res.json({success:false,msg:"no token found"})
	}
	
	function getToken(headers){
	//console.log(headers)
	//console.log(headers.authorization)
	if(headers && headers.authorization){
		var parted = headers.authorization.split(' ');
		if(parted.length === 2){
			return parted[1];
		}else{
			return null;
		}
	}else{
		return null
	}
	}
}

exports.update = function(req,res,next){
	var token = getToken(req.headers)
	var decode = jwt.decode(token,secret)
	var users = decode[0].users;
	var email = users.userdetail.email;
	userdetails.update(
			{"users._id":users._id},
			{$set:{"users.$.userdetail.0.firstname":req.body.firstname,
					"users.$.userdetail.0.lastname":req.body.lastname,
					 "users.$.userdetail.0.phone":req.body.phone,
					  "users.$.userdetail.0.address":req.body.address,
						"users.$.userdetail.0.pincode":req.body.pincode,
						  "users.$.userdetail.0.city":req.body.city}},
			function(err,data){
				if(err){
					throw err
				}
				var users = new userdetails();
				users.returndata(email,function(err,updata){
					if(err){
						res.json({success:false,err})
					}else{
						var newToken = jwt.encode(updata,secret)
						res.json({success:true,data,token:'Bearer '+newToken})
					}

				})
				// console.log(newToken)
				// console.log(data)
			})
	function getToken(headers){
		if(headers || headers.authorization){
			var parted = headers.authorization.split(' ');
			if(parted.length === 2){
				return parted[1]
			}else{
				return null
			}
		}else{
			return null;
		}
	}
}
