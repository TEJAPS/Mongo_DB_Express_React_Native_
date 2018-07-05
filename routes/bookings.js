var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');
// Connection URL
// var url = 'mongodb://127.0.0.1:27017/taxiapp';

var db = mongojs("mongodb://localhost:27017/taxiapp",["bookings"]);

// MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server");
//     // this.db = db;    
//   });
router.get("/bookings",function(req,res,next){
    db.bookings.find(function(err,bookings){
        if(err){
            res.send(err);
        }
        res.json(bookings);
    })
});

router.get("/bookings/add",function(req,res,next){
    var {name,pickup,dropOff} = req.query;
    var myobj = {"username":name , "pickup":pickup,"dropOff":dropOff}
    db.collection("bookings").insert(myobj,function(err,response){
        if(err) throw err;
        // console.log("1 doc inserted");
        res.send(response);  
    })
});

router.get("/bookings/delete",function(req,res,next){
    const {name} = req.query;
    var myquery = {"username":name }
    db.collection("bookings").remove(myquery,function(err,response){
        if(err) throw err;
        // console.log("1 doc inserted");
        res.send(response);  
    })
});

module.exports = router;