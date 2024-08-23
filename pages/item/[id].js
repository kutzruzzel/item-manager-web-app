import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getItemById, updateItem, deleteItem } from '../../utils/api'; // Import the utility functions
import { Container, Row, Col, Card, Button, Form, Alert, Modal } from 'react-bootstrap';

const ItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const data = await getItemById(id); // Use the utility function to get item
          setItem(data);
          setNewName(data.name);
          setNewDescription(data.description);
          setNewPrice(data.price);
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };

      fetchItem();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteItem(id); // Use the utility function to delete item
      router.push('/'); // Redirect to home page after deleting item
    } catch (error) {
      setError('Error deleting item. Please try again.'); // Display error message
    } finally {
      setShowDeleteModal(false); // Close the modal after deletion
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateItem(id, {
        name: newName,
        description: newDescription,
        price: parseFloat(newPrice),
      });
      setItem({ ...item, name: newName, description: newDescription, price: parseFloat(newPrice) });
      setIsUpdating(false); // Disable update mode
    } catch (error) {
      setError('Error updating item. Please try again.'); // Display error message
    }
  };

  const handleCancel = () => {
    setNewName(item.name);
    setNewDescription(item.description);
    setNewPrice(item.price);
    setIsUpdating(false); // Exit update mode
  };

  if (!item) return <div>Loading...</div>;

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Item Detail</h1>
          {isUpdating ? (
            <Card>
              <Card.Body>
                <h2>Update Item</h2>
                <Form onSubmit={handleUpdate}>
                  <Form.Group>
                    <Form.Label>New Name:</Form.Label>
                    <Form.Control
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>New Description:</Form.Label>
                    <Form.Control
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>New Price:</Form.Label>
                    <Form.Control
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="me-2">
                    Update
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {item.description}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ${item.price}
                </Card.Text>
                <Button variant="secondary" onClick={() => setIsUpdating(true)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          )}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          <Button variant="link" href="/">Back to Home</Button>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetail;
