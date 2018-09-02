import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {

  setSelectedBook = (bookId) => {
    this.props.setSelectedBookId(bookId);
  };

  renderBooks = () => {
    // Notice that that this.props.data refers to the result of the 
    //  getBooksQuery GraphQL query.  It includes extra properties besides just
    //  the "books" data though, such as the "loading" flag.
    const { books, loading } = this.props.data;

    if (loading) {
      return (<div>Loading books...</div>);
    } else {
      return books.map((book, i) => (
          <li key={book.id}
            onClick={() => this.setSelectedBook(book.id)}>{book.name}</li>
        )
      );
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
