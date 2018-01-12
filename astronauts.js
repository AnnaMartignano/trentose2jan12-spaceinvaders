// file that specify the person
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AstronautSchema = new Schema({
    firstName: String,
    lastName : String,
    isInSpace : Number
});
module.exports = mongoose.model('Astronaut', AstronautSchema);
