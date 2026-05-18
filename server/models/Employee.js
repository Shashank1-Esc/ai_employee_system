import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide an employee name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    department: {
        type: String,
        required: [true, 'Please provide a department'],
    },
    skills: {
        type: [String],
        default: [],
    },
    performanceScore: {
        type: Number,
        required: [true, 'Please provide a performance score'],
        min: 0,
        max: 100,
    },
    experience: {
        type: Number,
        required: [true, 'Please provide years of experience'],
        min: 0,
    }
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
