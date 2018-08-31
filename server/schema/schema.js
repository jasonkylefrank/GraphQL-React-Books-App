const graphql = require('graphql');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // each of these "fields" will be root queries
    //  (or entry points)
    fields: {
        book: { 
            type: BookType,
            arg: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // Code to get data from db or other source

                //TODO...
            }
         }
    }
});

module.exports = new GraphQLSchema({
    // Expose the root query as entry points for client code
    query: RootQuery
});
