import { useState } from 'react';
import { createItem } from '../utils/api';
import { useRouter } from 'next/router';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const CreateItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createItem({
        name,
        description,
        price: parseFloat(price),
      });
      router.push('/'); // Redirect to home page
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  return (
    <Container className="mt-5">
      <h1>Create New Item</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPrice" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Create Item
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      <Button variant="secondary" className="mt-4" onClick={() => router.push('/')}>
        Back to Home
      </Button>
    </Container>
  );
};

export default CreateItem;
