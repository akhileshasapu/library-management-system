const { db_url } = require("./default");
const mongoose =require('mongoose')

const connectDB = async () => {
    try {
       const client = await mongoose.connect(db_url);
        console.log("mongo connected");

        
    }
    catch (er) {
        console.log(er.message);
        process.exit(1);
        }
        
}
module.exports = connectDB;