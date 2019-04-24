var mongoose = require("mongoose");

// SCHEMA SETUP
var widgetSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  url: String
});

// Compling Schema into a Model 
module.exports = mongoose.model("Widget", widgetSchema);