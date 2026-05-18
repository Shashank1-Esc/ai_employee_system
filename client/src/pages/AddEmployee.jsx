import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        skills: '',
        performanceScore: '',
        experience: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
            performanceScore: Number(formData.performanceScore),
            experience: Number(formData.experience)
        };

        try {
            await api.post('/employees', payload);
            toast.success('Employee added successfully!');
            navigate('/employees');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="form-card">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'hsl(var(--color-text-main))' }}>
                    Register New Employee
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="john@company.com"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Department</label>
                            <select
                                name="department"
                                required
                                value={formData.department}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="">Select Department</option>
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                                <option value="HR">HR</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Experience (Years)</label>
                            <input
                                type="number"
                                name="experience"
                                required
                                min="0"
                                value={formData.experience}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="e.g. 5"
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label className="form-label">Performance Score (0-100)</label>
                        <input
                            type="number"
                            name="performanceScore"
                            required
                            min="0"
                            max="100"
                            value={formData.performanceScore}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g. 85"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Skills (comma separated)</label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            placeholder="e.g. React, Node.js, MongoDB"
                            className="form-input"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={loading} className="btn-primary" style={{ width: 'auto', padding: '0.875rem 2rem' }}>
                            {loading ? 'Saving...' : 'Save Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
