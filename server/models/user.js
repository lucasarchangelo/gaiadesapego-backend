var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    nickname:     {type: String,  required: true},
    email:        {type: String,  required: true},
    password:     {type: String,  required: true},
});

module.exports = mongoose.model('User', UserSchema);