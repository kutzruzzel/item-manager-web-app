import axios from "axios";

// Create an instance of Axios with a base URL for the API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your Flask API base URL
});

// Function to fetch all items
export const getItems = async () => {
  try {
    const response = await api.get('/items');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to fetch a single item by ID
export const getItemById = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to create a new item
export const createItem = async (item) => {
  try {
    const response = await api.post('/items', item);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to update an existing item
export const updateItem = async (id, itemData) => {
  try {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to delete an item by ID
export const deleteItem = async (id) => {
  try {
    await api.delete(`/items/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {
  let errorMessage = 'An unexpected error occurred';
  
  if (error.response) {
    // Check if the response contains a JSON error message
    if (error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    } else if (error.response.status === 400) {
      errorMessage = 'Bad Request: Please check the submitted data.';
    } else if (error.response.status === 404) {
      errorMessage = 'Not Found: The requested resource could not be found.';
    } else if (error.response.status === 500) {
      errorMessage = 'Internal Server Error: Something went wrong on the server.';
    }
  } else if (error.request) {
    errorMessage = 'No response was received from the server.';
  }

  throw new Error(errorMessage);
};
