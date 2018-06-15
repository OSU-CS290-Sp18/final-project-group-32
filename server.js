/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Johannes Freischuetz
 * Email: freischj@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var mongoHost = process.env.MONGO_HOST || 'classmongo.engr.oregonstate.edu';
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUsername = process.env.MONGO_USERNAME || 'cs290_freischj';
var mongoPassword = process.env.MONGO_PASSWORD || 'supersecure';
var mongoDBName = process.env.MONGO_DB_NAME || 'cs290_freischj';
var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

var mongoDB = null;

var app = express();
var port = process.env.PORT || 3000;

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    }
));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

app.use('/', express.static('public'));

app.get('/create', function (req, res) {
  res.status(200).render('create', {
  });
});

app.get('/about', function (req, res) {
  res.status(200).render('about', {
  });
});

app.get('/', function (req, res) {
    /*var scenarioCollection = mongoDB.collection('travels');
    scenarioCollection.find().toArray(function (err, scenarios) {
        if (err) {
            res.status(500).send("Error fetching Database.");
        } else {
            console.log(scenarios);
        }
    });*/
    res.render('slideshow', {
    });
});

app.get('*', function (req, res) {
  res.status(404).render('404', {
  });
});

app.post('/create/add',
  function (req, res, next) {
      /*if (req.body && req.body.photoURL) {
          console.log();
      } else {
          res.status(400).send("Request must specify ");
      }*/
      res.status(200).send(req.body);
      console.log(req.body);
  });

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
})
