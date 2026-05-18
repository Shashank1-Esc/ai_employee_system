import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';

const SearchEmployee = () => {
    const [department, setDepartment] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!department.trim()) {
            toast.error("Please enter a department to search");
            return;
        }

        setLoading(true);
        setSearched(true);
        try {
            const res = await api.get(`/employees/search?department=${department}`);
            setResults(res.data);
        } catch (error) {
            toast.error('Search failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="form-card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleSearch} className="search-container">
                    <div className="search-input-wrap">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by Department (e.g. Development, HR)"
                            className="search-input"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: 'auto', padding: '0 2rem' }}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>
            </div>

            {searched && (
                <div className="table-card">
                    <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Search Results</h3>
                        <span style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-muted))' }}>
                            {results.length} found
                        </span>
                    </div>
                    {results.length > 0 ? (
                        <div>
                            {results.map(emp => (
                                <div key={emp._id} className="search-result-card" style={{ border: 'none', borderBottom: '1px solid hsl(var(--color-border))', borderRadius: 0, padding: '1.5rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{emp.name}</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-muted))' }}>{emp.email}</p>
                                        <div style={{ marginTop: '0.75rem' }}>
                                            {emp.skills.map(skill => (
                                                <span key={skill} className="skill-tag">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'hsl(var(--color-primary))' }}>
                                            {emp.performanceScore}/100
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-muted))', margin: '0.25rem 0 0.75rem' }}>
                                            {emp.experience} Yrs Exp
                                        </div>
                                        <span className="badge">
                                            {emp.department}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'hsl(var(--color-text-muted))' }}>
                            No employees found in this department.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchEmployee;
