import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('teams', teamsApiUrl)
      .then((data) => { setTeams(data); setStatus({ loading: false, error: '' }) })
      .catch(() => setStatus({ loading: false, error: 'We could not reach the API. Check that the backend is running.' }))
  }, [])

  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">Train together</span><h2>Teams</h2></div><span className="section-count">{teams.length} squads</span></div><CollectionState loading={status.loading} error={status.error} empty={!teams.length}><div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><div className="team-card-top"><span className="team-symbol">{team.name?.slice(0, 1) || 'T'}</span><span className="team-points">{(team.totalPoints || 0).toLocaleString()} pts</span></div><h3>{team.name}</h3><p>{team.motto}</p><div className="member-stack">{(team.members || []).slice(0, 4).map((member) => <span className="profile-avatar tiny" key={member._id}>{member.avatar || member.name?.slice(0, 2)}</span>)}<span className="member-count">{team.members?.length || 0} members</span></div></article>)}</div></CollectionState></section>
}

export default Teams
