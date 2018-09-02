import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

class AddBook extends Component {

    renderAuthors = () => {
        const { authors, loading } = this.props.data;

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
            <form id='add-book'>
                <div className="field">
                    <label htmlFor="bookNameInput">Book name:</label>
                    <input id="bookNameInput" type="text" />
                </div>
                <div className="field">
                    <label htmlFor="bookGenreInput">Genre:</label>
                    <input id="bookGenreInput" type="text" />
                </div>
                <div className="field">
                    <label htmlFor="authorPicker">Author:</label>
                    <select name="authorPicker" id="authorPicker">
                        {this.renderAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

// Bind the GraphQL query to the component so the data from the query will get
//  passed-in to the component via props.
export default graphql(getAuthorQuery)(AddBook);