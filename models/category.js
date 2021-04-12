const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }]
});

module.exports = mongoose.model('categories', categorySchema);