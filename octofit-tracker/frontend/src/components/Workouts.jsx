import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

const workoutsApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('workouts', workoutsApiUrl)
      .then((data) => { setWorkouts(data); setStatus({ loading: false, error: '' }) })
      .catch(() => setStatus({ loading: false, error: 'We could not reach the API. Check that the backend is running.' }))
  }, [])

  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">Built for today</span><h2>Workouts</h2></div><span className="section-count">Personal picks</span></div><CollectionState loading={status.loading} error={status.error} empty={!workouts.length}><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-meta"><span>{workout.focus}</span><span>{workout.durationMinutes} min</span></div><h3>{workout.title}</h3><p>{workout.difficulty} pace for a focused session.</p><ul>{(workout.exercises || []).map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div></CollectionState></section>
}

export default Workouts
