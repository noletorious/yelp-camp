var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds.js");
var middlewareObj = require("../middleware");
//===============
// CAMPGROUNDS
//===============

//Index
router.get("/campgrounds", function(req, res){
    //get all campgrounds from DB
    Campground.find({
        //nothing in here because we want all
    },function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds});
        }
    });
    //then render the file
    
});

//New - form for new campgrounds
router.get("/campgrounds/new", middlewareObj.isLoggedIn,function(req,res){
    req.flash("success","Campground successfully created.");
    res.render("../views/campgrounds/new.ejs");
});

//Create - get data from form then redirect
router.post("/campgrounds", function(req,res){
    //get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newCampground = {name:name, image:image, price:price , description:desc, author:author}
    Campground.create(newCampground, function(err,campground){
        if(err){
            console.log(err);            
        }else{
            console.log("========Newly created campground")
            res.redirect("/campgrounds");
        }
    });
});

//Show - displays a single campground
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
           //render campground
            res.render("../views/campgrounds/campground.ejs",{campground:foundCampground}) 
        }
    });
});

//Edit
router.get("/campgrounds/:id/edit",middlewareObj.verifyUserOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("../views/campgrounds/edit.ejs",{campground:foundCampground}) 
        }
    });
});

//Update
router.put("/campgrounds/:id", middlewareObj.isLoggedIn, function(req, res){
    Campground.findOneAndUpdate(req.params.id,req.body.campground,function(err, updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

//DeStRoY
router.delete("/campgrounds/:id",middlewareObj.verifyUserOwnership, function(req, res){
    Campground.findOneAndDelete(req.params.id,function(err,deletedCampground){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds/")
        }
    })
});

module.exports = router;