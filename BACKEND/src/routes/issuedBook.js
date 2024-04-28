const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Issue = require('../models/issuedBook');
const { secret } = require('../config/default');
const { updateBook } = require('./updates');
const { auth } = require('./auhtMiddleware');


// Route to add an issue
router.post('/issue', async (req, res) => {
  try {
    const jwtToken = req.headers.authorization
    const bookToken = req.body.bookToken;
    // console.log(bookToken);
    //  console.log(jwtToken);

    
    if (!jwtToken || !bookToken) {
      return res.status(400).json({ error: 'JWT token and book token are required' });
    }

    // Verifying
    const decodedToken = jwt.verify(jwtToken, secret);
    // console.log(decodedToken)
    const studentId = decodedToken.userID;

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
     await updateBook(bookToken);
    // Create a new issue
    const newIssue = new Issue({ student: studentId, book_token: bookToken });
    await newIssue.save();

    res.status(201).json({ message: 'Issue added successfully', issue: newIssue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/',auth, async(req,res)=>{


  try {

    const issues = await Issue.find().populate('student', 'rollNo');;

    
    const formattedIssues = issues.map(issue => ({
      _id: issue._id,
      studentRollNo: issue.student ? issue.student.rollNo : 'N/A', // Retrieve student's roll number or 'N/A' if not available
      book_token: issue.book_token,
      issue_date: issue.issue_date,
      __v: issue.__v
    }));

    console.log(formattedIssues)
    return res.status(200).json({issues:formattedIssues})
    
  } catch (er) {

    return res.status(400).json({message:"error while getting all issues"});
    
  }
})



module.exports = router;