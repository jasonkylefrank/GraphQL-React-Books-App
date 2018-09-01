const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
    // Don't need to worry about Id b/c mLab will create it
});

// Create a mongoose MODEL called "Book" based on the bookSchema
// This will correspond to a "Books" COLLECTION in MongoDb 
//  (it knows to pluralize it)
module.exports = mongoose.model('Book', bookSchema);