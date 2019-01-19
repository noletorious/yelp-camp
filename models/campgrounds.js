var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundsSchema = new mongoose.Schema({
   name: String,
   image: String,
   price: String,
   description:String,
   author:{
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
   username:String,
   },
   comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
         }]
});

//INSERT SCHEMA INTO MODEL
module.exports = new mongoose.model("Campground", campgroundsSchema);