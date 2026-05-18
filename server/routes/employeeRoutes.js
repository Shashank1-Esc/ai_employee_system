import express from 'express';
import { 
    addEmployee, 
    getEmployees, 
    searchEmployees, 
    updateEmployee, 
    deleteEmployee 
} from '../controllers/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All employee routes are protected
router.use(protect);

router.post('/', addEmployee);
router.get('/', getEmployees);
router.get('/search', searchEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
