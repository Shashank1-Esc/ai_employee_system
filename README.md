# AI Powered Employee Recommendation & Management System

This is a complete MERN stack application designed for the AI308B examination. It includes employee management, JWT authentication, and OpenRouter AI integration for intelligent HR insights.

## Technology Stack
- **Frontend**: React 18 (Vite), Tailwind CSS, React Router DOM, Axios, react-hot-toast, Lucide React.
- **Backend**: Node.js, Express.js, MongoDB + Mongoose, JWT, bcryptjs, Joi validation.
- **AI Integration**: OpenRouter API (`google/gemini-2.5-flash`).

## Project Structure
- `/client`: Frontend Vite React application.
- `/server`: Backend Node.js Express application.

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account (or local MongoDB)
- OpenRouter API Key

## Setup & Installation

### 1. Backend Setup
1. Open terminal and navigate to the backend folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory (use `.env.example` as a template):
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Exam API Testing & Postman
All API endpoints are documented in the EXAM_REPORT.md. You can test them using Postman or Thunder Client by setting the `Authorization` header to `Bearer <your_jwt_token>` after logging in.

## Deployment on Render
### Backend Deployment (Render Web Service)
1. Create a new Web Service on Render and connect your GitHub repo.
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Environment Variables: Add all variables from `.env` (PORT, MONGO_URI, JWT_SECRET, OPENROUTER_API_KEY).

### Frontend Deployment (Render Static Site)
1. Create a new Static Site on Render and connect your GitHub repo.
2. Root Directory: `client`
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Environment Variables:
   - `VITE_API_URL`: Your deployed Render backend URL (e.g., `https://your-backend-url.onrender.com/api`)

**Note:** For frontend routing to work correctly on Render Static Sites, you may need to configure redirects or rewrites in Render settings (Catch all `/*` to `/index.html`).
