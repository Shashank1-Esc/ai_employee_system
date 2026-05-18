# EXAM SUBMISSION REPORT
## AI308B: AI Driven Full Stack Development

### 1. Cover Page
**Project Title**: AI Powered Employee Recommendation & Management System
**Course**: AI308B - AI Driven Full Stack Development
**Technologies**: MERN Stack + OpenRouter AI

### 2. Project Abstract
This project is a comprehensive HR management system built using the MERN stack. It facilitates secure employee data management and integrates advanced AI capabilities via OpenRouter to analyze performance metrics and provide actionable promotion, training, and feedback recommendations.

### 3. Problem Statement
Modern HR departments struggle to manually evaluate employee performance data, track skills, and identify promotion candidates objectively. There is a critical need for an automated, AI-assisted platform that centralizes employee data and provides unbiased, data-driven HR recommendations.

### 4. Objectives
- Develop a secure, RESTful API for employee data management.
- Implement robust JWT authentication and Role-Based access.
- Build a responsive, modern React frontend dashboard.
- Integrate LLM capabilities to generate automated HR insights.

### 5. Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Axios, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas, Mongoose.
- **Authentication**: JWT, bcryptjs.
- **AI Integration**: OpenRouter API (`google/gemini-2.5-flash`).
- **Deployment**: Render (Frontend & Backend).

### 6. System Architecture
The application follows the MVC (Model-View-Controller) architecture. The React frontend communicates with the Express backend via RESTful endpoints. The backend interacts with MongoDB for data persistence and calls the OpenRouter API for AI processing.

### 7. API Endpoints Table

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Authenticate user | No |
| POST | `/api/employees` | Add new employee | Yes |
| GET | `/api/employees` | Get all employees | Yes |
| GET | `/api/employees/search?department=HR` | Search employees | Yes |
| PUT | `/api/employees/:id` | Update employee | Yes |
| DELETE | `/api/employees/:id` | Delete employee | Yes |
| POST | `/api/ai/recommend` | Get AI HR analysis | Yes |

### 8. Database Explanation
The system uses MongoDB Atlas with two primary schemas:
- **User Schema**: Stores authentication credentials, secured with bcrypt hashing. Enforces unique emails.
- **Employee Schema**: Stores operational data (name, email, department, skills, performanceScore, experience). Enforces validation rules (e.g., performanceScore between 0-100).

### 9. AI Integration Explanation
The AI integration utilizes the OpenRouter API. The backend constructs a highly specific system prompt containing the target employee's metrics. The AI is instructed to return a strictly formatted JSON payload containing strengths, weaknesses, a training recommendation, a ranking score out of 10, and a final summary. The frontend then parses this JSON to display a rich, analytical UI card.

### 10. Deployment (Render)
- **Backend**: Deployed as a Web Service on Render. Environment variables including `MONGO_URI`, `JWT_SECRET`, and `OPENROUTER_API_KEY` are securely injected.
- **Frontend**: Deployed as a Static Site. `VITE_API_URL` is configured to point to the live Render backend URL. CORS is configured on the backend to allow requests from the Render static site domain.

### 11. Challenges Faced & Future Enhancements
- **Challenge**: Ensuring the LLM always returned perfectly formatted JSON. Solved by using strict system prompts and cleaning markdown formatting via regex in the backend controller.
- **Enhancement**: Implementing role-based access control (Admin vs standard HR user) and adding visual performance charts to the dashboard.

### 12. Conclusion
The AI Powered Employee Recommendation & Management System successfully demonstrates a full-stack integration of modern web technologies with advanced AI APIs, fulfilling all the requirements of the AI308B examination rubric.
