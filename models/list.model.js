var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ListSchema = new Schema({
  produit: String,
  qty: String
});

var List = mongoose.model("List", ListSchema)
module.exports = List