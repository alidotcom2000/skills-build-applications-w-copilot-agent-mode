export function CollectionState({ loading, error, empty, children }) {
  if (loading) return <div className="state-panel">Loading your latest data...</div>
  if (error) return <div className="state-panel state-error">{error}</div>
  if (empty) return <div className="state-panel">No records yet.</div>
  return children
}
