import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {

    renderBook = () => {
        // this.props.data is the GraphQL object
        const { name, genre, author } = this.props.data.book;
        const bookElements = author.books.map((book, i) => (
            <li key={i}>{book.name}</li>
        ));

        return (
            <div>
                <h3>{name}</h3>
                <p>{genre}</p>                
                <h5>By {author.name}</h5> 
                <p>{author.age} years old</p>   
                <p>All books by this author:</p>           
                <ul className="other-books">
                    {bookElements}
                </ul>
            </div>
        );
    }

    renderBookLoading = () => {
        return (
            <div>Loading book...</div>
        );
    }

    renderNoBook = () => {
        return (
            <div>No book selected</div>
        );
    }

    render() {
        // Data and properties coming from the GraphQL object
        const queryProps = this.props.data;
        let contents;

        if (!this.props.bookId) {
            contents = this.renderNoBook();
        } else if(queryProps.loading) {
            contents =  this.renderBookLoading();
        } else {
            contents = this.renderBook();
        }

        return (
            <div id="book-details">
                {contents}
            </div>
        );
    }
}

// Bind the GraphQL query to the component so the data from the query will get
//    passed-in to the component via props.
// In this case the getBookQuery needs a PARAMETER, so we pass the second 
//    argument to graphql() to make sure it gets executed with its parameter.
//    Note that we cannot call the imported getBookQuery like a function in 
//    this component because it is not a function, but rather a gql object 
//    which graphql() knows how to use.  So the way that we pass a parameter
//    to it is via the options function as a parameter to graphql().
//    See: https://youtu.be/v-7a9N-mXkU?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&t=224
export default graphql(getBookQuery, {
    // Whenever props are passed into this component, this function will run
    //   which will set the "id" parameter for the getBookQuery and run it.
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        };
    }
})(BookDetails);
