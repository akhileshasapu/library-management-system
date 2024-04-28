const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },
  author: { type: String, required: true },
  total_count: { type: Number, required: true },
  available_count: { type: Number, required: true },
 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;