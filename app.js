//MODULES
var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    methodOverride      = require("method-override"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local");
    
//MODELS + data
var Campground      = require("./models/campgrounds.js"),
    Comment         = require("./models/comments.js"),
    User            = require("./models/user.js");
    //seedDB          = require("./seed.js");

//seedDB();

//ROUTES

var commentRoutes = require("./routes/comments.js");
var campgroundRoutes = require("./routes/campgrounds.js");
var indexRoutes = require("./routes/index.js");

//CONFIG
console.log(process.env.DATABASEURL);
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

//--code so we can use the bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//--serve styles and scripts
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

//PASSPORT AUTH CONFIGURATION
app.use(require("express-session")({
    secret:"haythisisrandome",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

//starts server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Starting YelpCamp server...")
})