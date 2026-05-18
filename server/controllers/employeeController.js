import Employee from '../models/Employee.js';
import Joi from 'joi';

const validateEmployee = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        department: Joi.string().required(),
        skills: Joi.array().items(Joi.string()).default([]),
        performanceScore: Joi.number().min(0).max(100).required(),
        experience: Joi.number().min(0).required(),
    });
    return schema.validate(data);
};

// @desc    Add Employee
// @route   POST /api/employees
// @access  Private
export const addEmployee = async (req, res, next) => {
    try {
        const { error } = validateEmployee(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        const { email } = req.body;
        const exists = await Employee.findOne({ email });
        if (exists) {
            res.status(400);
            throw new Error('Employee with this email already exists');
        }

        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (err) {
        next(err);
    }
};

// @desc    Get All Employees
// @route   GET /api/employees
// @access  Private
export const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (err) {
        next(err);
    }
};

// @desc    Search Employee
// @route   GET /api/employees/search?department=Development
// @access  Private
export const searchEmployees = async (req, res, next) => {
    try {
        const { department } = req.query;
        let query = {};
        
        if (department) {
            query.department = { $regex: new RegExp(department, 'i') };
        }
        
        const employees = await Employee.find(query);
        res.json(employees);
    } catch (err) {
        next(err);
    }
};

// @desc    Update Employee
// @route   PUT /api/employees/:id
// @access  Private
export const updateEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            res.status(404);
            throw new Error('Employee not found');
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(updatedEmployee);
    } catch (err) {
        next(err);
    }
};

// @desc    Delete Employee
// @route   DELETE /api/employees/:id
// @access  Private
export const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            res.status(404);
            throw new Error('Employee not found');
        }

        await employee.deleteOne();
        res.json({ id: req.params.id, message: 'Employee removed successfully' });
    } catch (err) {
        next(err);
    }
};
