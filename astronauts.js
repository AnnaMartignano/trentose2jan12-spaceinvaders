// file that specify the person
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AstronautsSchema = new Schema({
    firstName: String,
    lastName : String,
    isInSpace : Number
});
module.exports = mongoose.model('Astronaut', AstronautsSchema);
