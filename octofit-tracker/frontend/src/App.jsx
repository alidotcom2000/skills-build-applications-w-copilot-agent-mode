import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness application for logging activities, building teams,
            and climbing the leaderboard.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API Health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/" target="_blank" rel="noreferrer">
              Vite Docs
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">Ready for launch</h2>
              <ul className="mb-0">
                <li>React 19 + Vite frontend</li>
                <li>Express + TypeScript backend</li>
                <li>MongoDB access via Mongoose</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
