import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

function Leaderboard() {
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('leaderboard')
      .then((data) => { setRows(data); setStatus({ loading: false, error: '' }) })
      .catch(() => setStatus({ loading: false, error: 'We could not reach the API. Check that the backend is running.' }))
  }, [])

  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">The weekly climb</span><h2>Leaderboard</h2></div><span className="section-count">Top performers</span></div><CollectionState loading={status.loading} error={status.error} empty={!rows.length}><div className="leaderboard-list">{rows.map((row, index) => <article className={`leader-row${index === 0 ? ' leader-row-top' : ''}`} key={row._id}><span className="rank">{row.rank || index + 1}</span><span className="profile-avatar small">{row.user?.avatar || row.user?.name?.slice(0, 2) || '?'}</span><div className="leader-person"><strong>{row.user?.name || 'Athlete'}</strong><span>{row.team?.name || 'Independent'}</span></div><strong className="points">{(row.points || 0).toLocaleString()} pts</strong></article>)}</div></CollectionState></section>
}

export default Leaderboard
