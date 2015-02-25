var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: String,
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false},
    permissions: [String]
});

module.exports = mongoose.model('User', UserSchema);