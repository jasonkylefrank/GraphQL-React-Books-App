import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

// Note that you can also name the mutation (inside the gql``).  So that 
//  mutation line could look like: `mutation AddBook($name....)`
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation };