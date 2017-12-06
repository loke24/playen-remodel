var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

var Schema = mongoose.Schema;
var userschema = new Schema({
	users:[{
		userdetail:[{
			firstname:{
				type:String,
				require:true,
				unique:true
			},
			lastname:{
				type:String,
				require:true,
				unique:true
			},
			email:{
				type:String,
				require:true
			},
			password:{
				type:String,
				require:true
			},
			phone:{
				type:String,
				require:true
			},
			address:{
				type:String,
				require:true
			},
			pincode:{
				type:String,
				require:true
			},
			city:{
				type:String,
				require:true
			}

		}]
	}]
});


userschema.methods.comparepassword = function(password,this_pass,callback){
		bcrypt.compare(password,this_pass,function(err,isMatch){
		if(err){
			return callback(err,null);
		}else{
			return callback(null,isMatch)
		}
	})
};

userschema.pre('findOneAndUpdate',function(next){
	var user = this.getUpdate().$push.users.userdetail;
	console.log(user.firstname)
	mongoose.models["userdetails"].findOne({"users.userdetail.email":user.email},function(err,check){
		if(check){
			console.log(user);
			var err = new Error("already existed");
			err.check = check;
			next(err);
		}
		else{
			bcrypt.genSalt(10,function(err,salt){
			if(err){
				return next(err);
			}else{
				bcrypt.hash(user.password,salt,function(err,hash){
					if(err){
						return next(err);
					}else{

						user.password = hash;
						next();
					}
				
				})
			}
	})
		}
	})
	

})

userschema.methods.returndata = function(email,cb){
	mongoose.models["userdetails"].aggregate(
											{$unwind:"$users"},
											{$unwind:"$users.userdetail"},
											{$match:{"users.userdetail.email":email}},
											{$project:{"users":"$users"}},
		function(err,data){
		if(data){
			return cb(null,data[0])

		}else{
			console.log(err)
			return cb(err,null)
		}
})
}
userschema.pre('update',function(next){
	console.log("WORKS")
	next()
})


var userdetails = mongoose.model('userdetails',userschema);


module.exports = userdetails;
