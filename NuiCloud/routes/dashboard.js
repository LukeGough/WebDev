var express = require("express");
var router = express.Router();
var widget = require("../models/widget");
var user = require("../models/user");
var middleware = require("../middleware");

// INDEX - Show all Widgets
router.get("/", middleware.isLoggedIn, function(req, res){
  // Get all widgets from DB
  widget.find({}, function(err, allWidgets){
    if(err){
      req.flash("error", "Oops! Something went wrong.");
      console.log(err);
    } else {
      res.render("index", {widgets: allWidgets});
    }
  })
});

// CREATE - Add new Widgets to DB
router.post("/", middleware.isAdmin, function(req, res){
  //get data from form and add to dbWidgets array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var url = req.body.url;
  var newWidget = {name: name, image: image, description: desc, url: url}
  // Create a new widget and save to DB
  widget.create(newWidget, function(err, newlyCreated){
    if(err){
      req.flash("error", "Oops! Something went wrong.");
      console.log(err);
    } else {
      //redirect back to dashboard page
      req.flash("success", "Widget successfully created!");
      res.redirect("/dashboard");
    }
  })  
});

// NEW - Show form to create new Widget
router.get("/new", middleware.isAdmin, function(req, res){
  res.render("new.ejs");
});

// SHOW - Shows more info about one Widget
router.get("/:id", middleware.isLoggedIn, function(req, res){
  // find the widget with the provided ID
  widget.findById(req.params.id, function(err, foundWidget){
    if(err || !foundWidget){
      req.flash("error", "Oops! Something went wrong.");
      console.log(err);
      res.redirect("back")
    } else {
      // render show template
      res.render("show" , {widget: foundWidget});
    }
  });
});

// EDIT - Editing Widgets
router.get("/:id/edit", middleware.isAdmin, function(req, res){
    widget.findById(req.params.id, function(err, foundWidget){
      res.render("edit", {widget : foundWidget});
    });
});

// UPDATE - Updating Widgets
router.put("/:id", middleware.isAdmin, function(req, res){
  // find and update the correct widget
  widget.findByIdAndUpdate(req.params.id, req.body.widget, function(err, updatedWidget){
    if(err){
      req.flash("error", "Oops! Something went wrong.");
      res.redirect("/dashboard");
    } else {
      req.flash("success", "Widget successfully updated!");
      res.redirect("/dashboard/" + req.params.id);
    }
  });
});

// DESTROY - Delete Widgets
router.delete("/:id", middleware.isAdmin, function(req, res){
  widget.findByIdAndRemove(req.params.id, function(err){
    if(err){
      req.flash("error", "Oops! Something went wrong.");
      res.redirect("/dashboard");
    } else {
      req.flash("success", "Widget successfully deleted!");
      res.redirect("/dashboard");
    }
  })
});

module.exports = router;