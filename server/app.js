const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
// Configure the dotenv module so we can access our DB credentials or
//  other values from environment variables. It will look for a ".env"
//  file in the same directory to get its config values from.
require('dotenv').config();

const app = express();
const port = 4000;

// Allow cross-origin requests via the "cors" middleware.
//  See: https://www.youtube.com/watch?v=uyrUI1tgayk&index=26&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f
app.use(cors());

// Connect to mLab database
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
// The connection string should look like:
//   mongodb://<dbuser>:<dbpassword>@ds141932.mlab.com:41932/graphql-books-ninja
const connectionString = 
    `mongodb://${dbUser}:${dbPassword}@ds141932.mlab.com:41932/${dbName}`;

mongoose.connect(connectionString, { useNewUrlParser: true });
// Add an event listener to fire a function once the connection is open
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});
mongoose.connection.on(
    'error', 
    console.error.bind(console, 'Connection error: ')
);

// Add the GraphQL middleware so Express can handle queries to the
//  "/graphql" endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(port, () => { 
    console.log(`Now listening for requests on port ${port}...`);
    console.log(''); 
});

