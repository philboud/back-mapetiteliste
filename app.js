const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
var mongoose = require('mongoose')
var List = require("./models/list.model")
const uri = process.env.MONGODB_URI;


mongoose.connect('mongodb+srv://phil:8qbGPicrSnWrJ6x@my-littlte-app-cluster.fuzbi.mongodb.net/listDB?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


// Fetch all lists
app.get('/lists', (req, res) => {
  List.find({}, 'produit qty', function (error, lists) {
    if (error) { console.error(error); }
    res.send({
      lists: lists
    })
  })
})

// Add new list
app.post('/list', (req, res) => {
  var db = req.db;
  var produit = req.body.produit;
  var qty = req.body.qty;
  var new_list = new List({
    produit: produit,
    qty: qty,
  })

  new_list.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'list saved successfully!'
    })
  })
})

// Fetch single list
app.get('/lists/:id', (req, res) => {
  var db = req.db;
  var laReq = 'produit qty'
  List.findById(req.params.id, laReq, function (error, list) {
    if (error) { console.error(error); }
    res.send(list)
  })
})

// Update a list
app.put('/list/:id', (req, res) => {
  var db = req.db;
  list.findById(req.params.id, 'list', function (error, list) {
    if (error) { console.error(error); }
    list.produit = req.body.produit
    list.qty = req.body.qty
    list.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a list
app.delete('/lists/:id', (req, res) => {
  var db = req.db;
  List.remove({
    _id: req.params.id
  }, function(err, list){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


app.listen(process.env.PORT || 8082)