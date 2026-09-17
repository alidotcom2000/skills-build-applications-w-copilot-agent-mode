import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

const usersApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('users', usersApiUrl)
      .then((data) => { setUsers(data); setStatus({ loading: false, error: '' }) })
      .catch(() => setStatus({ loading: false, error: 'We could not reach the API. Check that the backend is running.' }))
  }, [])

  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">The people behind the points</span><h2>Members</h2></div><span className="section-count">{users.length} athletes</span></div><CollectionState loading={status.loading} error={status.error} empty={!users.length}><div className="member-grid">{users.map((user) => <article className="member-card" key={user._id}><span className="profile-avatar large">{user.avatar || user.name?.slice(0, 2)}</span><div><h3>{user.name}</h3><p>{user.goal}</p><span className="member-email">{user.email}</span></div></article>)}</div></CollectionState></section>
}

export default Users
