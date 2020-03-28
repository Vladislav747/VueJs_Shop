'use strict';

//Models by mongoose
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Создание схемы данных
let ProductSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    urlPhoto: {
        type: String,
        required: false
    },
    dateOfTask: {
        type: Date,
        required: false
    }
    }, 
    {
        collection: 'productList'
    }
);


// ProductSchema.path('tag').set(function (v) {
//     console.log(v);
//     return v.join(',');
// });

// ProductSchema.path('tag').get(function (v) {
//     console.log(v);
//     return v.split(',');
// });


// Create collection and add schema
var Product = mongoose.model('Product', ProductSchema);



module.exports = Product;