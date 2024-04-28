const express = require("express")

const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const  app = express()
const connectDB = require("./config/db")



connectDB();

app.use(express.json({extended: false}))
app.use(cors());

 

app.use('/api/books',require('./routes/books'));
app.use('/api/admin',require('./routes/admin'));
app.use('/api/issues',require('./routes/issuedBook'));
app.use('/api/student',require('./routes/student'));

    




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});