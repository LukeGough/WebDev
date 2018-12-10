var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/nuip_blog_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer("expressSanitizer"));


//MONGOOSE CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test NuiP",
//   image: "https://i.imgur.com/gYELYz0.png",
//   body: "This is a test NuiP"
// });

//RESTful ROUTES
app.get("/", function(req, res){
  res.redirect("/nuips");
});

//INDEX
app.get("/nuips", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("ERROR");
    } else {
        res.render("index", {blogs: blogs});
    }
  });
});

//NEW
app.get("/nuips/new", function(req, res){
  res.render("new");
});

//CREATE
app.post("/nuips", function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.render("new");
    } else {
        res.redirect("/nuips");
    }
  });
});

//SHOW
app.get("/nuips/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/nuips");
    } else {
        res.render("show", {blog: foundBlog});
    }
    
  });
});

//EDIT
app.get("/nuips/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/nuips");
    } else {
        res.render("edit", {blog: foundBlog});
    }
  });
});

//UPDATE
app.put("/nuips/:id", function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect("/nuips");
    } else {
        res.redirect("/nuips/" + req.params.id);
    }
  });
});

//DESTROY
app.delete("/nuips/:id", function(req, res){
  // Blog.findByIdAndRemove(req.params.id, function(err){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/nuips");
    } else {
        res.redirect("/nuips");
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("nuiP Server Has Started...")
});
