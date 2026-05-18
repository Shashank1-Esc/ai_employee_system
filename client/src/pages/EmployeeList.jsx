import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const res = await api.get('/employees');
            setEmployees(res.data);
        } catch (error) {
            toast.error('Failed to load employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                setEmployees(employees.filter(emp => emp._id !== id));
                toast.success('Employee deleted');
            } catch (error) {
                toast.error('Failed to delete employee');
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading employees...</div>;

    return (
        <div className="animate-fade-in">
            <div className="table-card">
                <div className="table-header">
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>All Employees</h2>
                </div>
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Performance</th>
                                <th>Experience</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp._id}>
                                    <td style={{ fontWeight: 500 }}>{emp.name}</td>
                                    <td style={{ color: 'hsl(var(--color-text-muted))' }}>{emp.email}</td>
                                    <td>
                                        <span className="badge">
                                            {emp.department}
                                        </span>
                                    </td>
                                    <td>{emp.performanceScore}/100</td>
                                    <td>{emp.experience} Yrs</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button 
                                            onClick={() => handleDelete(emp._id)}
                                            className="btn-icon"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {employees.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--color-text-muted))' }}>
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
