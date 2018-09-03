import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);

// Enable hot module replacement so we can avoid full-page refreshes.
//  See: https://medium.com/superhighfives/hot-reloading-create-react-app-73297a00dcad
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(
            <NextApp />,
            rootElement
        );
    });
}
