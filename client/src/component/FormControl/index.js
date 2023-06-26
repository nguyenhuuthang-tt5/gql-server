import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap'

import { useQuery, useMutation } from '@apollo/client';
import { addSingleBook, addSingleAuthor } from '../../graphql-client/mutations';
import { getAuthors, getBooks } from '../../graphql-client/queries';

const FormControl = () => {
    // State
    const [authorList, setAuthorList] = useState([])
    const [newBook, setNewBook] = useState({
        name: '',
        genre: '',
        authorId: '',
    })
    const [newAuthor, setNewAuthor] = useState({
        name: '',
        age: 1,
    })

    // Query
    const {loading, data, error} = useQuery(getAuthors)

    // Mutation
    const [addBook, dataMutation] = useMutation(addSingleBook)
    const [addAuthor, dataMutationAuthor] = useMutation(addSingleAuthor)
    console.log(dataMutationAuthor);
    // Effect
    useEffect(() => {
        if(data) {
            setAuthorList(data.authors)
        }
    }, [data, authorList])

    // Handle event
    const onInputBookChange = (e) => {
        setNewBook({
                ...newBook,
                [e.target.name]: e.target.value,
            }
        )
    }
    const onInputAuthorChange = (e, number = null) => {
        if(number !== null) {
            setNewAuthor({
                    ...newAuthor,
                    [e.target.name]: number,
                }
            )
        } else {
            setNewAuthor({
                    ...newAuthor,
                    [e.target.name]: e.target.value,
                }
            )
        }
    }
    const onButtonSubmitBook = (e) => {
        e.preventDefault()
        addBook({
            variables: {
                name: newBook.name,
                genre: newBook.genre,
                authorId: newBook.authorId,
            },
            refetchQueries: [{query: getBooks}]
        })
        setNewBook({
            name: '',
            genre: '',
            authorId: ''
        })
    }
    const onButtonSubmitAuthor = (e) => {
        e.preventDefault()
        addAuthor({
            variables: {
                name: newAuthor.name,
                age: newAuthor.age,
            },
            refetchQueries: [{query: getAuthors}]
        })
        setNewAuthor({
            name: '',
            age: 1,
        })
    }

    // render setup
    let option = null;
    if(loading) option = <option>Loading author...</option>
    if(error) option = <option>Error loading authors!</option>
    if(data) {
        option = authorList.map((author, index) => <option key={index} value={author.id}>{author.name}</option>)
    }
       
    return <Row>
        <Col>
            <Form onSubmit={onButtonSubmitBook}>
                <Form.Group className='mb-3'>
                    <Form.Control type='text' placeholder='Book name' name='name' onChange={onInputBookChange} value={newBook.name}/>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control type='text' placeholder='Book genre' name='genre' onChange={onInputBookChange} value={newBook.genre}/>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control as='select' name='authorId' onChange={onInputBookChange} value={newBook.authorId}>
                        <option value={''} disabled>Select author</option>
                        {option}
                    </Form.Control>
                </Form.Group>
                <Button className='float-end' variant='info' type='submit'>Add book</Button>
            </Form>
        </Col>
        <Col>
            <Form onSubmit={onButtonSubmitAuthor}>
                <Form.Group className='invisible mb-3'>
                    <Form.Control />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control type='text' placeholder='Author name' name='name' onChange={onInputAuthorChange} value={newAuthor.name} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control type='number' placeholder='Author age' name='age' min={1} max={100} onChange={(e) => onInputAuthorChange(e, Number(e.target.value))} value={newAuthor.age}/>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control type='file' placeholder='Author file' name='file'/>
                </Form.Group>
                <Button className='float-end' variant='info' type='submit'>Add author</Button>
            </Form>
        </Col>
    </Row>
};

export default FormControl;