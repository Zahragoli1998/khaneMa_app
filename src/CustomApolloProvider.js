import React, { useContext, useMemo, useRef } from 'react'

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";

import { setContext } from '@apollo/client/link/context';
// import { UserTokenContext } from './userTokenContext'
import Cookies from 'universal-cookie';

const graphqlEndpoint =  `http://localhost:80/graphql`

// The name here doesn't really matter.
export default function CustomApolloProvider(props) {
	const cookies = new Cookies()
  const token = `ut ${cookies.get('token')}`;
	console.log("to apollo",token);
  const tokenRef = useRef();

  // Whenever the token changes, the component re-renders, thus updating the ref.
  tokenRef.current = token;
	console.log(tokenRef.current);

  // Ensure that the client is only created once.
  const client = useMemo(() => {

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        auth: tokenRef.current ? `${tokenRef.current}` : null,
      }
    }));

    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {

      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path }) => {
          console.log(`message:${message} location:${location}`)
        })
      }
    
      if (networkError) {
        console.log(`networkerror: ${networkError}`)
      }
    })

    const httpLink = createHttpLink({
      uri: graphqlEndpoint,
    });

    const link = ApolloLink.from([errorLink, authLink, httpLink])
    
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, [token])
  
  return <ApolloProvider client={client} {...props} />;
}