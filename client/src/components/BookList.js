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
  position: relative;
  overflow: hidden;

  /* Creates a circular expand-in effect for hover state (its scaled down
      to size 0 before hover)  */
  :before {
    content: '';
    position: absolute;
    top: 0; bottom: 0; 
    /* left: 0; right: 0; */
    width: 48px;
    left: calc(50% - 24px);
    border-radius: 100%;
    z-index: -1; /* Lets the text sit on top of this */
    background-color: ${props => props.theme.colorBrandPrimary };
    transform-origin: center;
    transform: scale3d(0,0,1);
    transition: .35s all;
    opacity: 0.1;
  }

  :hover {
    color: white;
    box-shadow: 0 2px 12px rgba(0,0,0,0.7);

    &:before {
      transform: scale3d(8,8,1);
      opacity: 1;
    }
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
