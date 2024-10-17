# Customizable Forms Application - Backend (on going)

### Live link -- https://custom-form-back.onrender.com

## Overview

This is the backend portion of our Customizable Forms Application. It provides the API for creating and managing custom form templates, handling form submissions, and user authentication.

## Features

- User authentication and authorization
- CRUD operations for form templates
- Form submission handling
- Search functionality for templates
- Admin operations for user management

## Technology Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

## Project Structure

```
src/
|-- db/
|   |-- index.js
|-- models/
|   |-- templateModel.js
|   |-- userModel.js
|-- middleware/
|   |-- auth.js
|   |-- index.js
|-- controllers/
|   |-- authController.js
|   |-- templateController.js
|   |-- userController.js
|-- router/
|   |-- index.js
|-- service/
|   |-- authService.js
|   |-- templateService.js
|   |-- userService.js
|-- utils/
|   |-- index.js
|-- index.js
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- POST /api/v1/register - Register a new user
- POST /api/v1/login - Login user

### Templates

- GET /api/v1/searchTemplates?search=value - search templates
- GET /api/v1/template - Get all templates
- GET /api/v1/template/:id - Get a specific template
- POST /api/template - Create a new template
- PUT /api/templates/:id - Update a template
- DELETE /api/templates/:id - Delete a template

### Forms (not done yet)

- GET /api/v1/forms - Get all forms for a user
- GET /api/v1/forms/:id - Get a specific form
- POST /api/v1/forms - Submit a new form
- PUT /api/v1/forms/:id - Update a form (admin only)
- DELETE /api/v1/forms/:id - Delete a form (admin only)

### Admin

- GET /api/v1/users - Get all users (admin only)
- PUT /api/v1/users/:id - Update user status (admin only)
- DELETE /api/v1/users/:id - Delete a user (admin only)

## Authentication and Authorization

I use JSON Web Tokens (JWT) for authentication. The `checkToken` middleware checks for a valid JWT in the request header for protected routes.
