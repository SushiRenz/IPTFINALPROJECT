const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName:   { type: String, required: true },
  price:         { type: Number, required: true },
  imageURL:      { type: String, required: true }, // Store image URL or path
  description:   { type: String },
  category:      { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);