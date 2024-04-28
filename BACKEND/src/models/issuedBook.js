const mongoose = require('mongoose');
const Book = require('./books');

const issueSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  book_token: { type: String, required: true }, 
  issue_date: { type: Date, default: Date.now }, // Default value is current date/time
 
});

const Issue = mongoose.model('Issue', issueSchema);



module.exports = Issue;