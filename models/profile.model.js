var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ProfileSchema = new Schema({
  lastname: String,
  firstname: String,
  address: String,
  dataperso: [{
    mail: String,
    phone : String,
    genre: String
  }]
});

var Profile = mongoose.model("Profile", ProfileSchema)
module.exports = Profile