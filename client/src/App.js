import Container from 'react-bootstrap/Container'
import BookList from './component/BookList';
import FormControl from './component/FormControl';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className='py-3 mt-3' style={{backgroundColor: 'lightcyan'}}>
        <h1 className='text-center text-danger mb-3'>My Library</h1>
        <FormControl />
        <BookList />
      </Container>
    </ApolloProvider>
  );
}

export default App;
