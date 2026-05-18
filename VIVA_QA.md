# Viva Questions & Answers

**Q1: Explain the MVC architecture in your project.**
**Answer**: MVC stands for Model-View-Controller. In my project:
- **Model**: Mongoose schemas (`User.js`, `Employee.js`) that define the data structure and interact with MongoDB.
- **View**: The React frontend components and pages that display data to the user.
- **Controller**: Backend functions (`authController.js`, `employeeController.js`) that contain the business logic, process incoming requests, and send responses.

**Q2: How is JWT authentication implemented?**
**Answer**: When a user logs in successfully, the backend generates a JSON Web Token (JWT) using `jsonwebtoken` and a secret key. This token is sent to the client and stored in `localStorage`. For subsequent protected requests, the frontend Axios interceptor automatically attaches this token to the `Authorization` header. The backend `authMiddleware` verifies the token before allowing access to the route.

**Q3: How did you secure user passwords?**
**Answer**: I used `bcryptjs`. Before saving a user to the database during signup, I generate a salt and hash the plain text password. When logging in, I use `bcrypt.compare` to verify the entered password against the hashed password stored in the database.

**Q4: Explain your AI Integration.**
**Answer**: I used the OpenRouter API. The backend `aiController.js` takes an employee ID, fetches their details from MongoDB, and constructs a precise prompt. I send this to OpenRouter (using a fast model like Gemini Flash) asking for a strictly formatted JSON response. The backend receives the JSON, parses it, and sends it to the React frontend, which renders the recommendations beautifully. I also included a fallback mechanism in case the API request fails.

**Q5: How do you handle CORS issues?**
**Answer**: I used the `cors` middleware in my Express backend. This allows the backend to accept requests from different origins (like `localhost:5173` during development or the Render frontend URL in production).

**Q6: What is the purpose of useEffect in React?**
**Answer**: `useEffect` is a React Hook used to perform side effects in functional components. In my project, I use it to fetch employee data from the backend when a page loads (e.g., in `EmployeeList.jsx` and `Dashboard.jsx`). I pass an empty dependency array `[]` so it only runs once when the component mounts.

**Q7: How did you handle form validation?**
**Answer**: On the frontend, I used HTML5 validation (`required`, `min`, `max`) and React state. On the backend, I used the `Joi` library for robust schema validation to ensure data integrity before interacting with MongoDB, and Mongoose schema validation as a second layer of defense.
