const express = require("express")
const router = express.Router();

const Book = require('../models/books');
const {authMiddleware, auth } = require("./auhtMiddleware");
const { returnBack } = require("./updates");
const Issue = require("../models/issuedBook");






router.get('/', auth, async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({ books });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ Message: "Error at getting all books" });
    }
});

//desc add middleaware
router.post("/", authMiddleware, async(req,res)=>{

    try{

        const newBook = new Book({

            token:req.body.token,
            title:req.body.title,
            author:req.body.author,
            total_count:req.body.total_count,
            available_count:req.body.available_count

        })

        const book = await newBook.save();
        return res.json(book)

    }
    catch(er){
        console.log(er)
        res.status(400).send("server side error")

    }

})


router.put('/', authMiddleware, async(req,res)=>{
     
    try {
        
        const { bookToken} = req.body;
            // console.log(bookToken)
         await returnBack(bookToken);

         await Issue.deleteOne({ book_token:bookToken})

         return res.status(200).json({Message:"boook returned"})
        
        
    } catch (er) {

        return res.status(400).send("error at server side");
        
    }
})


router.post('/branch', auth ,async (req, res) => {
    try {
        let { startToken, endToken } = req.body;


        // startToken = parseInt(startToken);
        // endToken = parseInt(endToken);
          console.log(startToken+","+endToken)
        
        const booksInRange = await Book.find({
                token: { $lte: endToken,$gte: startToken },
              }); 

        // const booksInRange = await Book.aggregate([{
        //     token: {$range: [ startToken,endToken ] }

        // }])

        return res.status(200).json({ books: booksInRange });
    } catch (error) {
        console.error('Error fetching books:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;
