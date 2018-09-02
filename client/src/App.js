import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';


// ApolloClient setup
const client = new ApolloClient({
  // Set the endpoint that we'll make queries to
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedBookId: null };
  }

  setSelectedBookId = (bookId) => {
    this.setState({ selectedBookId: bookId });
  }

  // The ApolloProvider will inject data from the endpoint into our components
  //  because it is wrapping everything in the app.
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Jason's reading list</h1>
          <BookList setSelectedBookId={this.setSelectedBookId} />
          <AddBook />
          <BookDetails bookId={this.state.selectedBookId} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
