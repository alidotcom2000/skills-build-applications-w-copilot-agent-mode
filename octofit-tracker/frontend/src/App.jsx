import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Octofit Tracker</p>
            <h1 className="h3 mb-0">Fitness dashboard</h1>
          </div>
          <div className="text-muted small">
            <span className="fw-semibold">API mode:</span>{' '}
            {import.meta.env.VITE_CODESPACE_NAME
              ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
              : 'http://localhost:8000'}
          </div>
        </div>

        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded mt-3 px-3">
          <div className="navbar-nav d-flex flex-wrap gap-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? 'active bg-primary text-white' : 'text-dark'}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
