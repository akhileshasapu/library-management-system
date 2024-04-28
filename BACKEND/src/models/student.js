const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({


  fullname: { type: String, required: true },
  
  email: { type: String, required: true, unique: true },
  rollNo:{ type:String, required:true, unique:true},
  password: { type: String, required: true },
  role:{ type:String, default:'student'}
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;