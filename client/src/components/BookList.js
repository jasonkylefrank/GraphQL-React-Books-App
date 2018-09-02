import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

class BookList extends Component {

  renderBooks = () => {
    const { books, loading } = this.props.data;

    if (loading) {
        return (<div>Loading books...</div>);
    } else {
        return books.map((book, i) => (<li key={i}>{book.name}</li>));
    }
  };

  render() {
    return (
      <div>
          <ul id="book-list">
            {this.renderBooks()}
          </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
