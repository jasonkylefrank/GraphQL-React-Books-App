import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

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

// Bind the GraphQL query to the component so the data from the query will get
//  passed-in to the component via props.
export default graphql(getBooksQuery)(BookList);
