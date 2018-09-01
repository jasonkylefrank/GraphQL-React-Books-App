const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;



// dummy data
let books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'Some Book Name', genre: 'Sci-Fi', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Fake Book', genre: 'Sci-Fi', id: '0', authorId: '3' }
];

let authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1', bookIds: ['1'] },
    { name: 'Brandon Sanderson', age: 42, id: '2', bookIds: ['2'] },
    { name: 'Terry Pratchett', age: 66, id: '3', bookIds: ['0', '3'] }
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
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
                // const authorBooks = books.filter((book) => {
                //     const match = parent.bookIds.find((authorBookId) => (
                //         authorBookId === book.id
                //     ));             
                //     return match !== undefined;
                // });
                // return authorBooks;

                // Or if we use underscore, we could do it like this:
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // each of these "fields" will be root queries
    //  (or entry points)
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Code to get data from db or other source
                console.log(typeof (args.id));
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // Expose the root query as entry points for client code
    query: RootQuery
});
