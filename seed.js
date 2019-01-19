var mongoose  = require("mongoose");
var Campground = require("./models/campgrounds.js");
var Comment = require("./models/comments.js")

var data = [
        {
            name:"Heather's Point",
            image:"http://media.mobilerving.com/mobilerving/blog_image/resize/details/1499874322_blog_image.jpg",
            description:"This Point is where the hero's have died and lived another day."
        },
        {
            name:"Cacao Valley",
            image:"http://visitmeckva.com/wp-content/uploads/2018/04/camping-by-lake.jpg",
            description:"This tent is a terrible tent, whatever go with it."
        }
    ];

function seedDB(){
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err)
        }else{
            console.log("====Removed all campgorunds!=====");
            data.forEach(function(seed){    
                Campground.create(seed,function(err, campground){
                  if(err){
                      console.log(err)
                  }else{
                      console.log("added a campground");
                      Comment.create({
                          author:"Homer",
                          text: "Wow, this is a comment?"
                      },function(err, comment){
                          if(err){
                              console.log(err)
                          }else{
                                campground.comments.push(comment)
                                campground.save();
                                console.log("comment was greated for all posts")
                          }
                           
                      })
                  }
                });
            });
        }
    });
}

module.exports = seedDB;