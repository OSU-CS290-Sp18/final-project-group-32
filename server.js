/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Johannes Freischuetz, Fern Bostelman-Rinaldi
 * Email: freischj@oregonstate.edu, bostelmf@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');

var enconterData;
fs.readFile('encounters.json', 'utf8', function (err, data) {
  if (err) throw err;
  enconterData = JSON.parse(data);
});

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

app.get('/adventure/:id', function (req, res, next) {
    var adventuresCollection = mongoDB.collection('adventures');
    adventuresCollection.find({ adventure_id: parseInt(req.params.id) }).toArray(function (err, adven) {
        if (err) {
          res.status(500).send("Error fetching person from DB.");
        } else if (adven.length > 0) {
          res.status(200).render('adventure', adven[0]);
        } else {
          next();
        }
    });
});

app.get('/adventure', function (req, res) {
  res.status(404).render('404', {
  });
});

app.get('/', function (req, res) {
    res.render('home', {
    });
});

app.get('*', function (req, res) {
  res.status(404).render('404', {
  });
});

var adventures_count;
app.post('/create/add',
  function (req, res, next) {
      if (req.body && req.body.days && req.body.level && req.body.players && req.body.encounters) {

          var days_gen = [];
          for(var i = 0; i < parseInt(req.body.days); i++){
              var encounters = [];
              for(var j = 0; j < parseInt(req.body.encounters); j++){
                  var r = Math.floor(Math.random() * 20);
                  encounters.push(enconterData.encounters[r].monsters);
              }
              days_gen.push(encounters);
          }

          var adventures = mongoDB.collection('adventures');
          adventures.insertOne(
              {
                  adventure_id: adventures_count,
                  num_days: parseInt(req.body.days),
                  level: parseInt(req.body.level),
                  num_players: parseInt(req.body.players),
                  num_encounters: parseInt(req.body.encounters),
                  days: days_gen
              }
          );
          adventures_count++;

          res.status(200).send(req.body);
      } else {
          res.status(400).send("Specify all parameters");
      }
  });

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  mongoDB.collection('adventures').count(function(err, count){
      adventures_count = count;
  });
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
