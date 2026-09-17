import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', icon: '◒' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '↗' },
  { to: '/teams', label: 'Teams', icon: '⌘' },
  { to: '/users', label: 'Members', icon: '◎' },
  { to: '/workouts', label: 'Workouts', icon: '✦' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark">O</div>
          <div>
            <span className="brand-name">OctoFit</span>
            <span className="brand-label">Training club</span>
          </div>
        </div>
        <div className="sidebar-kicker">Workspace</div>
        <nav className="nav-list" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} key={item.to} to={item.to}>
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><span className="pulse-dot" /><span>Season 04 is live</span></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">Thursday, September 17, 2026</span>
            <h1>Keep the momentum.</h1>
          </div>
          <div className="profile-chip"><span className="profile-avatar">MC</span><span>Maya Chen</span><span className="profile-chevron">⌄</span></div>
        </header>
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
