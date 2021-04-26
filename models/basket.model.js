var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ProductSchema = new Schema({
  id_origin: String,
  sticker: String,
  description: String,
  modele: String,
  price: String,
  qty: Number,
  added: String
});

var Product = mongoose.model("Product", ProductSchema)
module.exports = Product