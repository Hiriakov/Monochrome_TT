const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'categories'
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('products', productSchema);