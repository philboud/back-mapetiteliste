var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ItemSchema = new Schema({
  title: String,
  description: String
});

var Items = mongoose.model("Items", ItemSchema)
module.exports = Items