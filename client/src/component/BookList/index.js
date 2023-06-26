import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Book from '../Book';
import BookDetail from '../BookDetail';

import { useQuery } from '@apollo/client';
import { getBooks } from '../../graphql-client/queries';

const BookList = () => {
    const { loading, error, data} = useQuery(getBooks)
    const [bookList, setBookList] = useState([])
    const [bookSelected, setBookSelected] = useState(null)
    useEffect(() => {
        if(data) {
            setBookList(data.books)
        }
    }, [data, bookList])

    if(loading) return <p>Loading Books...</p>
    if(error) return <p>Error loading Books!</p>

    return <Row>
        <Col md={8}>
            <Row>
                { bookList.map((book) => {
                        return <Book key={book.id} book={book} setBookSelected={setBookSelected}/>
                    })
                }           
            </Row>
        </Col>
        <Col md={4}>
            <BookDetail bookId={bookSelected}/>
        </Col>
    </Row>
};

export default BookList;