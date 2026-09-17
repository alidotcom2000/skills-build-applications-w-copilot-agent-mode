# OctoFit Tracker frontend

The frontend uses `VITE_CODESPACE_NAME` to build the Codespaces API URL:
`https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/[component]/`.

Copy `.env.example` to `.env.local` and define `VITE_CODESPACE_NAME` when the
backend is hosted in Codespaces. When it is unset, requests safely fall back to
`http://localhost:8000/api/[component]/`.

Run the development server with `npm run dev` or create a production build with
`npm run build`.
