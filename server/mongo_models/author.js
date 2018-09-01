const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number,
    // Don't need to worry about Id b/c mLab will create it
});

// Create a mongoose MODEL called "Author" based on the bookSchema
// This will correspond to an "Authors" COLLECTION in MongoDb
//  (it knows to pluralize it)
module.exports = mongoose.model('Author', authorSchema);