import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const NotFound = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'hsl(var(--color-bg))' }}>
            <BrainCircuit size={64} style={{ color: 'hsl(var(--color-primary))', marginBottom: '1rem', opacity: 0.5 }} />
            <h1 style={{ fontSize: '6rem', fontWeight: 800, color: 'hsl(var(--color-primary))', lineHeight: 1, margin: 0 }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'hsl(var(--color-text-main))', margin: '1rem 0' }}>Page Not Found</h2>
            <p style={{ color: 'hsl(var(--color-text-muted))', marginBottom: '2rem', textAlign: 'center', maxWidth: '400px' }}>
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn-primary" style={{ width: 'auto', padding: '0.875rem 2rem' }}>
                Return to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
