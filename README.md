# Item Manager Web Application

## Project Setup and Running Instructions

### Overview

This project includes both a backend and frontend. The backend is built with Flask, and the frontend is built with Next.js. Follow the instructions below to set up and run the project on your local machine.

## Intial Setup for your device

- **Install the latest Node.js and python on your device**

## Backend Setup (Flask)

- **Clone the Repository**

  Clone the repository to your local machine using the provided URL.

- **Navigate to the Backend Directory**

  Change to the `flask_api` directory.

  ```bash
  cd flask_api

- **Create a Virtual Environment**

  Run the following command to create a virtual environment:
  
  ```bash
  python -m venv venv

- **Create a Virtual Environment**

  On Windows: Use the command:

  ```bash
  venv\Scripts\activate

  On macOS/Linux: Use the command:

  ```bash
  source venv/bin/activate

- **Install Dependencies**

  Install the required packages using the requirements.txt file:

  ```bash
  pip install -r requirements.txt

- **Run the Flask Server**
  
  Start the Flask server:
  
  ```bash
  flask run

The backend server will be running on http://localhost:5000 by default.

## Frontend Setup (Next.js)

- **Open a new terminal session**

- **Install Dependencies**

  ```bash
  npm install

- **Run the Development Server**
 
  ```bash
  npm run dev

  The frontend server will be running on http://localhost:3000 by default.

## Troubleshooting

  - **Ensure Node.js and Python are Installed: Make sure Node.js and Python are installed on your machine. You can check this with node -v and python --version commands.**

  - **Check for Errors: If you encounter issues, carefully read the error messages and ensure all dependencies are correctly installed.**
 