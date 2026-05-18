import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, UserPlus, Search, BrainCircuit, LogOut, LayoutDashboard } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/employees', label: 'Employees List', icon: Users },
        { path: '/add-employee', label: 'Add Employee', icon: UserPlus },
        { path: '/search', label: 'Search', icon: Search },
        { path: '/ai-recommendation', label: 'AI Recommend', icon: BrainCircuit },
    ];

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <BrainCircuit size={28} style={{ color: 'hsl(var(--color-primary))' }} />
                    AI HR System
                </div>
                
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar">
                            {user?.name?.charAt(0)}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user?.name}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{user?.role}</div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-header">
                    <h2 className="page-title">
                        {location.pathname === '/' ? 'Dashboard' : location.pathname.substring(1).replace('-', ' ')}
                    </h2>
                </header>
                <div className="page-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
