import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import styled, { ThemeProvider } from 'styled-components';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';

// ApolloClient setup
const client = new ApolloClient({
  // Set the endpoint that we'll make queries to
  uri: 'http://localhost:4000/graphql'
});

// --- Styled Components & Theme
const theme = {
  colorBrandPrimary: "#c59305"
};

const Main = styled.main`
  padding: 0px;
  box-sizing: border-box;
  width: 60%;
  height: 100%;
  //background-color: pink;
`;

const AppTitle = styled.h1`
  margin-bottom: 0;
`;

const Tagline = styled.p`
  font-size: 13px;
  color: rgba(0,0,0,0.54);
  margin-top: 4px;
`;
// --- end Styled Components

class App extends Component {
  state = { selectedBookId: null };

  setSelectedBookId = (bookId) => {
    this.setState({ selectedBookId: bookId });
  }

  // The ApolloProvider will inject data from the endpoint into our components
  //  because it is wrapping everything in the app.
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Main>
            <AppTitle>Jason's reading list</AppTitle>
            <Tagline>A GraphQL-backed React app</Tagline>

            <BookList setSelectedBookId={this.setSelectedBookId} />
            <AddBook />
            <BookDetails bookId={this.state.selectedBookId} />
          </Main>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
