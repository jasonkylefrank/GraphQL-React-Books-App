import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import styled from 'styled-components';
import { darken } from 'polished';


const Form = styled.form`
    background-color: white;
    padding: 20px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 360px;
`;

const FormField = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    margin-bottom: 8px;

    & > label {
        text-align: right;
        padding: 4px 0;
    }

    & > input, & > select {
        padding: 4px;
        box-sizing: border-box;
        height: 100%;
    }
`;

const fabSize = 40;
const FormButton = styled.button`
    color: white;
    font-size: 24px;
    background-color: ${props => props.theme.colorBrandPrimary};
    border-radius: 50%;
    border: 0;
    padding: 0 10px;
    cursor: pointer;
    position: absolute;
    bottom: 16px;
    left: 10px;
    width: ${fabSize}px; height: ${fabSize}px;
    box-shadow: 0 2px 9px rgba(0,0,0,0.6);
    transition: .3s all;
    /* Hack!  Vertical positioning to the middle...  */
    padding-bottom: 2px;

    :hover {
        box-shadow: 0 2px 12px rgba(0,0,0,0.9);
    }
`;

const FormTitle = styled.h3`
    color: ${props => darken(0.08, props.theme.colorBrandPrimary)};
    margin-top: 0px;
    margin-bottom: 12px;
    text-align: center;
`;

class AddBook extends Component {

    state = { name: '', genre: '', authorId: '' };

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
            <Form onSubmit={this.submitForm} >
                <FormTitle>Add a book</FormTitle>
                <FormField>
                    <label htmlFor="bookNameInput">Book name:</label>
                    <input id="bookNameInput" type="text" 
                           onChange={(e) => this.setState({ name: e.target.value })} />
                </FormField>
                <FormField>
                    <label htmlFor="bookGenreInput">Genre:</label>
                    <input id="bookGenreInput" type="text" 
                           onChange={(e) => this.setState({ genre: e.target.value })}/>
                </FormField>
                <FormField>
                    <label htmlFor="authorPicker">Author:</label>
                    <select name="authorPicker" id="authorPicker"
                            onChange={(e) => this.setState({ authorId: e.target.value })}>
                        <option>Select author</option>
                        {this.renderAuthors()}
                    </select>
                </FormField>

                <FormButton>+</FormButton>
            </Form>
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