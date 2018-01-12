// file that specify the astronaut
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AstronautSchema = new Schema({
    firstName: String,
    lastName : String,
    isInSpace : Number
});
module.exports = mongoose.model('Astronaut', AstronautSchema);
