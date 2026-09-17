import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('activities')
      .then((data) => { setActivities(data); setStatus({ loading: false, error: '' }) })
      .catch(() => setStatus({ loading: false, error: 'We could not reach the API. Check that the backend is running.' }))
  }, [])

  return (
    <section className="page-section">
      <div className="page-heading"><div><span className="eyebrow">Your movement log</span><h2>Activities</h2></div><span className="section-count">{activities.length} logged</span></div>
      <CollectionState loading={status.loading} error={status.error} empty={!activities.length}>
        <div className="activity-grid">{activities.map((activity) => <article className="activity-card" key={activity._id}><span className="card-kicker">{activity.type}</span><strong>{activity.user?.name || 'Team member'}</strong><div className="metric-row"><span>{activity.durationMinutes} min</span><span>{activity.calories} kcal</span></div><time>{new Date(activity.completedAt).toLocaleDateString()}</time></article>)}</div>
      </CollectionState>
    </section>
  )
}

export default Activities
