import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { BrainCircuit, Star, Briefcase, Zap, TrendingUp } from 'lucide-react';

const AiRecommendation = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingEmps, setFetchingEmps] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await api.get('/employees');
                setEmployees(res.data);
            } catch (error) {
                toast.error('Failed to load employees for AI analysis');
            } finally {
                setFetchingEmps(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleGenerate = async () => {
        if (!selectedEmployee) {
            toast.error('Please select an employee first');
            return;
        }

        setLoading(true);
        setRecommendation(null);
        try {
            const res = await api.post('/ai/recommend', { employeeId: selectedEmployee });
            setRecommendation(res.data);
            toast.success('AI Analysis Complete');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to generate recommendation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-layout animate-fade-in">
            {/* Sidebar for Selection */}
            <div>
                <div className="ai-sidebar-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <BrainCircuit size={28} style={{ color: 'hsl(var(--color-primary))' }} />
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AI Assistant</h2>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-muted))', marginBottom: '1.5rem' }}>
                        Select an employee to generate a comprehensive AI-driven performance review and promotion recommendation.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <select
                            className="form-input"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            disabled={fetchingEmps}
                        >
                            <option value="">-- Select Employee --</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.name} ({emp.department})
                                </option>
                            ))}
                        </select>
                        
                        <button
                            onClick={handleGenerate}
                            disabled={loading || !selectedEmployee}
                            className="btn-primary"
                        >
                            {loading ? 'Analyzing...' : (
                                <>
                                    <Zap size={18} /> Generate Insights
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content for AI Result */}
            <div>
                {loading && (
                    <div className="ai-result-card loading-container">
                        <div className="spinner"></div>
                        <p style={{ color: 'hsl(var(--color-text-muted))' }}>OpenRouter AI is analyzing employee data...</p>
                    </div>
                )}
                
                {!loading && !recommendation && (
                    <div className="ai-result-card loading-container">
                        <BrainCircuit size={64} style={{ color: 'hsl(var(--color-border))', marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Analysis Generated</h3>
                        <p style={{ color: 'hsl(var(--color-text-muted))' }}>Select an employee and click generate to view AI insights.</p>
                    </div>
                )}

                {!loading && recommendation && (
                    <div className="ai-result-card animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid hsl(var(--color-border))', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>HR Recommendation Report</h3>
                                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-muted))' }}>Generated by OpenRouter AI</p>
                            </div>
                            <div className="ai-score-box">
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'hsl(var(--color-primary))', marginBottom: '0.25rem' }}>Ranking Score</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{recommendation.rankingScore}/10</div>
                            </div>
                        </div>

                        <div className="ai-grid">
                            <div className="ai-insight-box success">
                                <div className="ai-insight-title">
                                    <Star size={18} /> Strengths
                                </div>
                                <ul className="ai-list" style={{ color: 'hsl(var(--color-success))' }}>
                                    {recommendation.strengths?.map((s, idx) => <li key={idx}>{s}</li>)}
                                </ul>
                            </div>
                            
                            <div className="ai-insight-box danger">
                                <div className="ai-insight-title">
                                    <TrendingUp size={18} style={{ transform: 'rotate(180deg)' }} /> Areas for Improvement
                                </div>
                                <ul className="ai-list" style={{ color: 'hsl(var(--color-danger))' }}>
                                    {recommendation.weaknesses?.map((w, idx) => <li key={idx}>{w}</li>)}
                                </ul>
                            </div>
                            
                            <div className="ai-insight-box info" style={{ gridColumn: '1 / -1' }}>
                                <div className="ai-insight-title">
                                    <Briefcase size={18} /> Promotion Eligibility
                                </div>
                                <p style={{ fontWeight: 500, color: 'hsl(var(--color-primary))' }}>
                                    {recommendation.promotionEligibility}
                                </p>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Training Recommendations</h4>
                            <p style={{ color: 'hsl(var(--color-text-muted))' }}>{recommendation.trainingRecommendation}</p>
                        </div>
                        
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Final HR Summary</h4>
                            <div className="ai-summary">
                                "{recommendation.finalRecommendation}"
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiRecommendation;
