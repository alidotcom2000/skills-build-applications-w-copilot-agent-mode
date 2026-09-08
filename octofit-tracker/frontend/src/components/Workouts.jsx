import { useEffect, useState } from 'react';

function getApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const base = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return `${base}${path}`;
}

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object') return [];
  if (Array.isArray(data.results)) return data.results;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(getApiUrl('/workouts/'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!ignore) {
          setWorkouts(normalizeList(data));
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load workouts');
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-muted mb-0">No workouts available.</p>
        ) : (
          <div className="list-group list-group-flush">
            {workouts.map((workout, index) => (
              <div key={workout.id ?? workout._id ?? `${workout.title}-${index}`} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{workout.title}</strong>
                  <span className="badge bg-warning text-dark rounded-pill">{workout.difficulty}</span>
                </div>
                <div className="text-muted small mt-1">
                  {workout.durationMinutes ?? 0} minutes
                  {workout.focus ? ` • ${workout.focus}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
