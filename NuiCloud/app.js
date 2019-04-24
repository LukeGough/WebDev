var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    widget          = require("./models/widget"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

// requring routes
var dashboardRoutes = require("./routes/dashboard"),
    indexRoutes     = require("./routes/index");

// Used to seed data into the DB
//seedDB();

mongoose.connect("mongodb://localhost/nuicloud", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
  secret: "***SECRETGOESHERE***",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/dashboard", dashboardRoutes);


app.listen(3000, "192.168.0.28", function(){
  console.log("NuiCloud is now running");
});