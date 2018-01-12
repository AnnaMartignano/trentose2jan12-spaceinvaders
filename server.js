/**
 * Server that implements the Person API
 */

// server modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const app = express();

var Person = require('./astronauts');

// code to receive JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port for Heroku
var port = process.env.PORT || 8080;

var router = express.Router();		// router

mongoose.Promise = global.Promise;
// variable used to store the access information to the DB
var options = {
    useMongoClient: true,
    user: 'astro',
    pass: 'astro'
  };
  //conncet to the DB
  //mongodb://astro:astro@ds251747.mlab.com:51747/astronauts
mongoose.connect('mongodb://astro:astro@ds251747.mlab.com:51747/astronauts', options).then(
    () => { console.log('DB connected successfully!'); },
    err => { console.error(`Error while connecting to DB: ${err.message}`); }
);

router.route('/astronauts')
     // this code will be activated if a POST request arrive on  “/api/astronauts

    // get all the persons with GET
    .get(function (req, res) {
        console.log("Simple get of astronauts");

        // find all
        Astronaut.find(function(err,astronauts) {
            if(err) {
                res.send(err)
            } else {
                res.header("Content-type","application/json");
                res.send(JSON.stringify(astronauts,null,4));
            }

        })

    });

// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    // make sure we go to the next routes
    next();
});

// register our router on /api
app.use('/api', router);

app.listen(port, function() {
	console.log("Server running on port: " + port);
});

module.exports = app;
