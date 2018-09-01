const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
// Configure the dotenv module so we can access our DB credentials or
//  other values from environment variables.
require('dotenv').config();

const app = express();
const port = 4000;

// Connect to mLab database
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
// The connection string should look like:
//   mongodb://<dbuser>:<dbpassword>@ds141932.mlab.com:41932/graphql-books-ninja
const connectionString = 
    `mongodb://${dbUser}:${dbPassword}@ds141932.mlab.com:41932/${dbName}`;

mongoose.connect(connectionString);
// Add an event listener to fire a function once the connection is open
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

// Add the GraphQL middleware so Express can handle queries to the
//  "/graphql" endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(port, () => { 
    console.log(`Now listening for requests on port ${port}...`) 
});

