const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    bookName:{type:String, required:true},
    Author:{type:String, required:true},
    price:{type:String, required:true},  
});
const Books=mongoose.model('books',booksSchema);
module.exports = Books;