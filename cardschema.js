var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var carddetailSchema = new schema({
	cards:[{
		name:String,
		imageUrl:String
	}]
});

var carddetail = mongoose.model('carddetail',carddetailSchema);

module.exports = carddetail;

