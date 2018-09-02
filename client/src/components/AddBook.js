import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', genre: '', authorId: '' };
    }

    submitForm = (e) => {
        // Stop the browser from refreshing when the user submits the form
        e.preventDefault();
        const { name, genre, authorId } = this.state;
        // Store the new book to the database via the bound mutation prop.
        //
        // Right now the refetchQueries option is passed-in to tell the
        //   GraphQL query to refetch data from the DB after this mutation
        //   so that the BookList (or other) component can receive the new 
        //   complete list and print it to the screen.
        // TODO: Investigate using a GraphQL subscription in that other component
        //   so that this component does not have to deal with this issue.
        this.props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    renderAuthors = () => {
        const { authors, loading } = this.props.getAuthorsQuery;
        

        if (loading) {
            return (<option disabled>Loading authors...</option>);
        } else {
            return authors.map((author, i) => (
                <option key={i} value={author.id}>{author.name}</option>)
            );
        }
    };

    render() {
        return (
            <form id='add-book' onSubmit={this.submitForm} >
                <div className="field">
                    <label htmlFor="bookNameInput">Book name:</label>
                    <input id="bookNameInput" type="text" 
                           onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="field">
                    <label htmlFor="bookGenreInput">Genre:</label>
                    <input id="bookGenreInput" type="text" 
                           onChange={(e) => this.setState({ genre: e.target.value })}/>
                </div>
                <div className="field">
                    <label htmlFor="authorPicker">Author:</label>
                    <select name="authorPicker" id="authorPicker"
                            onChange={(e) => this.setState({ authorId: e.target.value })}>
                        <option>Select author</option>
                        {this.renderAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

// Bind the GraphQL queries to the component so the data from/to the queries will get
//  passed-in to the component via props.  In this case we have multiple GraphQL queries 
//  that we need to be bound to the component.  So that's why we need the "compose" function.
//  The end result will be a prop for each item that we are composing - using the "name"
//  that we pass-in via the options object.
export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery'}),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);