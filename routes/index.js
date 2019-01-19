
//===============
// USER Authentication dependacies 
//===============
var express = require("express");
var router = express.Router();
var middlewareObj = require("../middleware");

var User = require("../models/user.js");
var passport = require("passport");

//home page
router.get("/", function(req, res){
    res.render("landing.ejs")
});

//===============
// USER Authentication logic
//===============

router.get("/features", middlewareObj.isLoggedIn, function(req,res){
    res.render("features.ejs");
});

//===============
// USER Authentication logic
//===============
router.get("/profile",middlewareObj.isLoggedIn, function(req,res){
    res.render("profile.ejs");
});

router.get("/register",function(req,res){
    res.render("register.ejs");
});

//server register a user obj, pass in password separately, second parameter hashes password
router.post("/register",function(req,res){
    //register a user
    var newUser= new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err, user){
        if (err){
            console.log(err);
            return res.render("register.ejs");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome " + user.username +"!");
            res.redirect("/campgrounds");
        });
    });
});

//login
router.get("/login",function(req,res){
    res.render("login.ejs");
});

//ask server to authenticate
router.post("/login", passport.authenticate("local",{successRedirect:"/campgrounds",failureRedirect:"/login"}),function(req,res){});

//logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds")
})

module.exports = router;