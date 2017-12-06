var express = require('express');

var carddetails = require('./cardschema');



exports.carddetail = function(req,res,next){
	carddetails.find({},function(err,data){
		//console.log(data);
		res.json(data);
	})
}
exports.querydata = function(req,res,next){
	console.log(req.query.game)
	console.log(req.query.venue)
	carddetails.aggregate({$project:
								{"cards":
									{$filter:
										{
										  input:"$cards",
										  as:"card",
										  cond:
										  {$and:
										  	[
										  	{$eq:
										  		["$$card.venue",req.query.venue]
										  	},
										  	{$eq:
										  		["$$card.game",req.query.game]
										  	}
										  	]
										  }
										}

										  	
										}
									}
								},
		function(err,data){
			console.log(err)
			console.log(data);
			res.json(data);
		})
}