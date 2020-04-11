import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Apollo imports
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// Making Apollo Client
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
