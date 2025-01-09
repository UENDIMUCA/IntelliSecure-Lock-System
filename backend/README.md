# Backend Server Setup

To run the backend server, follow these steps:

1. **Create a `.env` file** in the `backend` folder (this one) and copy the following lines into it:

    ```env
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_HOST=
    JWT_SECRET=
    PORT=
    ```

    Fill in the parameters with your database credentials and desired port number.

2. **Install dependencies** by running the following command in the `backend` directory:

    ```sh
    npm install
    ```

3. **Start the server** in development mode using:

    ```sh
    npm run dev
    ```

    Or start the server in production mode using:

    ```sh
    npm start
    ```

## Available Scripts

- `npm start`: Starts the server in production mode.
- `npm run dev`: Starts the server in development mode with `nodemon` for automatic restarts.

## Project Structure

- `api/`: Contains the main application code.
  - `config/`: Configuration files for the application.
    - `config.js`: Configuration settings.
    - `database.js`: Database connection setup.
  - `controllers/`: Controller files for handling requests.
    - `authController.js`: Authentication controller.
    - `userController.js`: User controller.
  - `middleware/`: Middleware functions.
    - `authMiddleware.js`: Authentication middleware.
  - `models/`: Database models.
    - `user.js`: User model.
  - `routes/`: Route definitions.
    - `authRoutes.js`: Authentication routes.
    - `userRoutes.js`: User routes.
  - `app.js`: Main application setup.
  - `server.js`: Server entry point.

## Environment Variables

- `DB_USER`: Database username.
- `DB_PASSWORD`: Database password.
- `DB_NAME`: Database name.
- `DB_HOST`: Database host.
- `JWT_SECRET`: Secret key for JWT.
- `PORT`: Port number for the server.

## Database Setup

Ensure you have a PostgreSQL database running and update the `.env` file with your database credentials.

## API Endpoints

- **Authentication**
  - `POST /api/auth/login`: Login endpoint.

- **Users**
  - `POST /api/users`: Create a new user.
  - `GET /api/users`: Get all users (requires authentication).
  - `GET /api/users/:id`: Get a user by ID (requires authentication).
  - `PUT /api/users/:id`: Update a user by ID (requires authentication).
  - `DELETE /api/users/:id`: Delete a user by ID (requires authentication).
