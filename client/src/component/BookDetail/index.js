import React, { useState, useEffect, Fragment } from 'react';
import Card from 'react-bootstrap/Card'

import { useQuery } from '@apollo/client';
import { getSingleBook } from '../../graphql-client/queries';

const BookDetail = ({ bookId }) => {
    const [bookInfo, setBookInfo] = useState(null)
    const { loading, error, data} = useQuery(getSingleBook, {
        variables: {
            bookId: bookId
        }
    })
    useEffect(() => {
        if(data) {
            setBookInfo(data.book)
            console.log(bookInfo);
        }
    },[data, bookInfo])
    if(loading) return <p>Loading Book Info...</p>
    if(bookId !== null && error) return <p>Error loading!</p>
    return <Card border='warning' bg='info' text='white' className='shadow mt-4'>
        <Card.Body>
            {
                bookInfo == null ? <Card.Text>Choose your book</Card.Text> : 
                <Fragment>
                    <Card.Title>{bookInfo.name}</Card.Title>
                    <Card.Subtitle>{bookInfo.genre}</Card.Subtitle>
                    <p>{bookInfo.author.name}</p>
                    <p>Age: {bookInfo.author.age}</p>
                    <p>All books by this author</p>
                    <ul>
                        {
                            bookInfo.author.books.map((book) => <li>{book.name}</li>)
                        }
                    </ul>
                </Fragment>
            }
        </Card.Body>
    </Card>
};

export default BookDetail;