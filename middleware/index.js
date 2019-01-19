var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

var middlewareObj = {};

//Checks campground and logged in user is owner verified
middlewareObj.verifyUserOwnership= function(req,res,next){
     //is the user authenticated
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
            }else{
                //does the owner own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    //move on with rendering or whatevs
                    next();      
                } else {
                    //you do not have permissions
                    res.redirect("back");
                }
            }
        });
    }else{
        //you need to be logged in to do that
        res.redirect("back");
    }
}

//Checks campground and logged in user is owner verified
middlewareObj.verifyCommentOwnership = function(req,res,next){
     //is the user authenticated
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
            }else{
                //does the owner own the campground
                if(foundComment.author.id.equals(req.user._id)){
                    //move on with rendering or whatevs
                    next();      
                } else {
                    //you do not have permissions
                    res.redirect("back");
                    req.flash("error","You do not have permissions to edit");
                }
            }
        });
    }else{
        //you need to be logged in to do that
        req.flash("error","You need to be logged in.");
        res.redirect("back");
    }
}

//Checks if user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to login")
    res.redirect("/login");
};

module.exports = middlewareObj;