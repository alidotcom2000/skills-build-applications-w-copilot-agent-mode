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

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(getApiUrl('/leaderboard/'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!ignore) {
          setLeaderboard(normalizeList(data));
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load leaderboard');
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <p className="text-muted mb-0">No leaderboard data available.</p>
        ) : (
          <div className="list-group list-group-flush">
            {leaderboard.map((entry, index) => (
              <div key={entry.rank ?? entry._id ?? `${entry.userId}-${index}`} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>#{entry.rank ?? index + 1}</strong>
                  <span className="badge bg-success rounded-pill">{entry.points ?? 0} pts</span>
                </div>
                <div className="text-muted small mt-1">
                  {entry.userId?.name ?? entry.userId ?? 'Unknown user'}
                  {entry.streak ? ` • ${entry.streak}-week streak` : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
