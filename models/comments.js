var mongoose = require("mongoose");

//SCHEMA SETUP
var commentSchema = new mongoose.Schema({
   text: String,
   author: {
      id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String
   }
});

//INSERT SCHEMA INTO MODEL
module.exports = new mongoose.model("Comment", commentSchema);