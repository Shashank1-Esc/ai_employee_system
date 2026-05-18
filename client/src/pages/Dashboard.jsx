import { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, TrendingUp, Award, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        avgPerformance: 0,
        departments: 0,
        topPerformers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/employees');
                const employees = res.data;
                
                const depts = new Set(employees.map(e => e.department));
                const totalScore = employees.reduce((acc, curr) => acc + curr.performanceScore, 0);
                const topP = employees.filter(e => e.performanceScore >= 80).length;

                setStats({
                    totalEmployees: employees.length,
                    avgPerformance: employees.length ? Math.round(totalScore / employees.length) : 0,
                    departments: depts.size,
                    topPerformers: topP
                });
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Employees', value: stats.totalEmployees, icon: Users, color: '#3b82f6' },
        { label: 'Avg Performance', value: `${stats.avgPerformance}/100`, icon: TrendingUp, color: '#10b981' },
        { label: 'Departments', value: stats.departments, icon: Briefcase, color: '#8b5cf6' },
        { label: 'Top Performers', value: stats.topPerformers, icon: Award, color: '#f59e0b' },
    ];

    if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading Dashboard...</div>;

    return (
        <div className="animate-fade-in">
            <div className="card-grid">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-value">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="welcome-card">
                <h3 className="welcome-title">Welcome to the AI HR System</h3>
                <p className="welcome-desc">
                    Manage your employees efficiently. Use our OpenRouter AI integration to get intelligent insights, performance reviews, and promotion recommendations instantly.
                </p>
                <div className="action-buttons">
                    <Link to="/add-employee" className="btn-primary" style={{ width: 'auto' }}>
                        Add New Employee
                    </Link>
                    <Link to="/ai-recommendation" className="btn-secondary">
                        Get AI Insights
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
