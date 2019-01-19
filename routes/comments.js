var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds.js");
var Comment = require("../models/comments.js");
var middlewareObj = require("../middleware");
//===============
// COMMENTS
//===============

//New - form for creating a comment
router.get("/campgrounds/:id/comments/new", middlewareObj.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
        console.log(err)
        }else{
        res.render("../views/comments/new.ejs",{campground: foundCampground})
        }
    }); 
});

//Create - you just have to be logged in
router.post("/campgrounds/:id/comments",middlewareObj.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            //create a comment and push it into campgrounds comments array
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //push the comment in the campground object
                   campground.comments.push(comment);
                   //save if created
                   campground.save();
                   //redirect to back to campground page
                   res.redirect("/campgrounds/"+req.params.id)
                }
            });
        }
    })
});

//Edit - form for updating comment
router.get("/campgrounds/:id/comments/:comment_id/edit", middlewareObj.verifyCommentOwnership ,function(req,res){
    //find the campground
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err)
        }else{
            //find the comment to update
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err);
                }else{
                    res.render("../views/comments/edit.ejs",{comment:foundComment, campground:foundCampground}); 
                }
            });
        }
    })
    
});

//Update "put" - comments
router.put("/campgrounds/:id/comments/:comment_id",middlewareObj.verifyCommentOwnership,function(req,res){
    //find the campground
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err)
        }else{
           Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,commentUpdating){
                if(err){
                    res.redirect("back")
                }else{
                    res.redirect("/campgrounds/"+foundCampground._id)
                }
            });
        }
    })
});

//Destroy comment
router.delete("/campgrounds/:id/comments/:comment_id",middlewareObj.verifyCommentOwnership, function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

module.exports = router;