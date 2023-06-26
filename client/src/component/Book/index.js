import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'


const Book = ({book, setBookSelected}) => {

    return <Col md={4} className='mt-4' onClick={setBookSelected.bind(this, book.id)} style={{ cursor: 'pointer' }}>
        <Card border='info' text='info' className='text-center shadow' >
            <Card.Body>{book.name}</Card.Body>
        </Card>
    </Col>
};

export default Book;