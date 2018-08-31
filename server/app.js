const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const port = 4000;

// Add the GraphQL middleware so Express can handle GraphQL
app.use('/graphql', graphqlHTTP({
    schema
}));


app.listen(port, () => { 
    console.log(`Now listening for requests on port ${port}...`) 
});

