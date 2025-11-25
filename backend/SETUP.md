# QuestForge Backend Setup

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   - Database credentials (DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE)
   - JWT secrets (use strong, random strings in production)
   - CORS origin

3. **Create PostgreSQL database:**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE questforge;
   ```

4. **Run the application:**
   ```bash
   # Development mode with auto-reload
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:cov` - Run tests with coverage

## API Endpoints

The API is available at `http://localhost:3000/api` by default.

### Health Check
- `GET /api/health` - Check API status

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Users
- `GET /api/users/profile` - Get current user profile (requires authentication)
- `GET /api/users` - Get all users (requires authentication)

### Campaigns
- `POST /api/campaigns` - Create a campaign (requires authentication)
- `GET /api/campaigns` - Get all campaigns for the authenticated user
- `GET /api/campaigns/:id` - Get a specific campaign
- `PATCH /api/campaigns/:id` - Update a campaign
- `DELETE /api/campaigns/:id` - Delete a campaign

### Characters
- `POST /api/characters` - Create a character (requires authentication)
- `GET /api/characters` - Get all characters for the authenticated user
- `GET /api/characters?campaignId=:id` - Get characters for a specific campaign
- `GET /api/characters/:id` - Get a specific character
- `PATCH /api/characters/:id` - Update a character
- `DELETE /api/characters/:id` - Delete a character

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Database Schema

The application uses TypeORM with PostgreSQL. The schema is automatically synchronized in development mode.

### Entities:
- **Users** - User accounts with email, password (hashed), name, role
- **Campaigns** - RPG campaigns with name, description, setting, status
- **Characters** - Player characters with attributes, skills, history

## Security Features

- **Password hashing** with bcrypt
- **JWT authentication** with configurable expiration
- **Input validation** using class-validator
- **CORS protection** with configurable origins
- **Helmet** for security headers
- **Rate limiting** to prevent abuse
- **SQL injection protection** via TypeORM parameterized queries

## Development

The application uses TypeScript and follows NestJS best practices:
- Modular architecture
- Dependency injection
- DTOs for validation
- Guards for authentication
- Entities for database models

## Testing

Run tests with:
```bash
npm test
```

For e2e tests:
```bash
npm run test:e2e
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure the database exists

### Port Already in Use
- Change the PORT in `.env` to an available port

### JWT Token Errors
- Ensure JWT_SECRET is set in `.env`
- Check token expiration settings
