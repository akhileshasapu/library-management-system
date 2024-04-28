const Book = require("../models/books");


async function updateBook(token){

     try {
        
     } catch (er) {
        
     }
    const book = await Book.findOne({ token });


    book.available_count -= 1;

    await book.save();

    // console.log(book)
  
  }


  
async function returnBack(token){
 try {
    
    const book = await Book.findOne({ token });
    


    book.available_count += 1;

    await book.save();
   

    console.log(book)
  
    
 } catch (er) {
    console.log(er);
    
 }


    // console.log(book)
  
  }




  module.exports={ updateBook,
                      returnBack }