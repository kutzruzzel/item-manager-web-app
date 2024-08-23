import { useEffect, useState } from 'react';
import { getItems } from '../utils/api';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';

const Home = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Error fetching items. Please try again.');
      }
    };

    fetchItems();
  }, []);

  const handleCreateItem = () => {
    router.push('/create-item');
  };

  return (
    <Container>
      {/* Display error message */}
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      
      {/* Header with spacing */}
      <Row className="mb-4">
        <Col>
          <h1 className="mt-4">List of Items</h1> {/* Margin-top added */}
        </Col>
      </Row>

      {/* Display list of items or message if no items */}
      {items.length > 0 ? (
        <Row>
          {items.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> ${item.price}
                  </Card.Text>
                  <Button variant="info" onClick={() => router.push(`/item/${item.id}`)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="text-center">
          <Col>
            <p>No items to display</p> {/* Message for no items */}
          </Col>
        </Row>
      )}

      {/* Button to create new item */}
      {/* Button to create new item */}
      <Row className="my-4">
          <Col>
            <Button variant="primary" onClick={handleCreateItem}>
              Create Item
            </Button>
          </Col>
        </Row>
    </Container>
  );
};

export default Home;
