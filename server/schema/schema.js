const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../mongo_models/book');
const Author = require('../mongo_models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull 
} = graphql;


// // Dummy data
// let books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'Some Book Name', genre: 'Sci-Fi', id: '4', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Fake Book', genre: 'Sci-Fi', id: '0', authorId: '3' }
// ];

// let authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1', bookIds: ['1'] },
//     { name: 'Brandon Sanderson', age: 42, id: '2', bookIds: ['2'] },
//     { name: 'Terry Pratchett', age: 66, id: '3', bookIds: ['0', '3'] }
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // --- For using local hard-coded dummy data
                //return _.find(authors, { id: parent.authorId });
                // --- For using the MongoDb via a Mongoose method
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // We need to use a FUNCTION for the fields value so that it will be
    //  executed after the entire file is parsed, which will enable GraphQL
    //  to know about all of our custom types, such as AuthorType, BookType,
    //  etc.  Otherwise it would error-out on some of those types as it
    //  reads the file top-to-bottom and finds a custom type that is defined
    //  farther down the file.
    //  See: https://youtu.be/ed8SzALpx1Q?t=4969
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            // Note this type, which enables us to return an array
            // (see: https://jaketrent.com/post/return-array-graphql/ )
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // --- For using local hard-coded dummy data
                // const authorBooks = books.filter((book) => {
                //     const match = parent.bookIds.find((authorBookId) => (
                //         authorBookId === book.id
                //     ));             
                //     return match !== undefined;
                // });
                // return authorBooks;

                // Or if we use underscore, we could do it like this:
                //return _.filter(books, { authorId: parent.id });
                // --- For using the MongoDb via a Mongoose method
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // Each of these "fields" will be root queries
    //  (or entry points)
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // --- For using local hard-coded dummy data
                //return _.find(books, { id: args.id });
                // --- For using the MongoDb via a Mongoose method
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // --- For using local hard-coded dummy data
                //return _.find(authors, { id: args.id });
                // --- For using the MongoDb via a Mongoose method
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // --- For using local hard-coded dummy data
                //return books;
                // --- For using the MongoDb via a Mongoose method
                //     (To grab all of the items in the collection, just
                //      pass an empty object)
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // --- For using local hard-coded dummy data
                //return authors;
                // --- For using the MongoDb via a Mongoose method
                //     (To grab all of the items in the collection, just
                //      pass an empty object)
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Define the various mutations
        addAuthor: {
            type: AuthorType,
            args: { 
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
             },
             resolve(parent, args) {
                 // Create an instance of the mongoose model
                 let author = new Author({
                     name: args.name,
                     age: args.age
                 });
                 // Save it to the MongoDb via a Mongoose method.
                 // Return the result so we can immediately query what
                 //  was saved.
                 return author.save();
             }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                // Create an instance of the mongoose model
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                // Save it to the MongoDb via a Mongoose method.
                 // Return the result so we can immediately query what
                 //  was saved.
                 return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // Expose the root query as entry points for client code
    query: RootQuery,
    // Expose all of our mutations
    mutation: Mutation
});
