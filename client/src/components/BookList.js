import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import styled from 'styled-components';


const BookListWrapper = styled.ul`
  padding: 0;
`;

const Book = styled.li`
  display: inline-block;
  margin: 8px 24px 8px 0;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colorBrandPrimary };
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  cursor: pointer;
  color: ${props => props.theme.colorBrandPrimary };
  transition: all .3s ease;

  :hover {
    background-color: ${props => props.theme.colorBrandPrimary };
    color: white;
    box-shadow: 0 2px 12px rgba(0,0,0,0.65);
  } 
`;


class BookList extends Component {

  setSelectedBook = (bookId) => {
    this.props.setSelectedBookId(bookId);
  };

  renderBooks = () => {
    // Notice that that this.props.data refers to the GraphQL object. It 
    //  contains the results of the getBooksQuery query (in the "book" 
    //  sub-property) as well as extra properties such as the "loading" 
    //  flag.
    const { books, loading } = this.props.data;

    if (loading) {
      return (<div>Loading books...</div>);
    } else {
      return books.map((book, i) => (
          <Book key={book.id}
            onClick={() => this.setSelectedBook(book.id)}>{book.name}</Book>
        )
      );
    }
  };

  render() {
    return (
      <div>
        <BookListWrapper>
          {this.renderBooks()}
        </BookListWrapper>
      </div>
    );
  }
}

// Bind the GraphQL query to the component so the data from the query will get
//  passed-in to the component via props.
export default graphql(getBooksQuery)(BookList);
