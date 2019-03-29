var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
    status:       {type: String,  required: true,  default: "0"},
    partnership:  {type: Boolean, required: true,  default: false},
    percent:      {type: Number,  required: true,  default: 100}, 
    price:        {type: Number,  required: true},
    owner:        {type: String,  required: true},
    category:     {type: String,  required: true},
    description:  {type: String,  required: true},
    size:         {type: String,  required: true},
    productStatus:{type: String,  required: true},
    payment:      {type: Number},
    selledMethod: {type: String},
    partnerName:  {type: String},
    clientName:   {type: String},
    observations: {type: String},
});

module.exports = mongoose.model('Product', ProductSchema);