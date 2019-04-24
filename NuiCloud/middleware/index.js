var widget = require("../models/widget");

// all middleware goes here
var middlewareObj = {};

middlewareObj.checkIfAdmin = function(req, res, next) {
  // is user logged in
  if(req.isAuthenticated()){
    // is the user an admin
    widget.findById(req.params.id, function(err, foundWidget){
      if(err || !foundWidget){
        req.flash("error", "Widget not found.")
        res.redirect("/dashboard");
      } else {
        if (req.user.isAdmin == true) {
          console.log(req.user.isAdmin);
          next();
        }
        else {
          // console.log(req.user.isAdmin);
          req.flash("error", "You don't have permission to do that.");
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

middlewareObj.isAdmin = function(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin == true) {
    next();
  } else {
      req.flash("error", "You don't have permission to do that.");
      res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that.");
  res.redirect("login");
}

module.exports = middlewareObj;