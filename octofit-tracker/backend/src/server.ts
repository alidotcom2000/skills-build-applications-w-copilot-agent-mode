import express from 'express';
import { connectToDatabase } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', async (_request, response) => {
  try {
    const userCount = await User.countDocuments();
    response.json({
      status: 'ok',
      service: 'octofit-tracker-api',
      baseUrl: apiBaseUrl,
      database: 'octofit_db',
      users: userCount,
    });
  } catch (error) {
    response.status(500).json({
      status: 'error',
      service: 'octofit-tracker-api',
      message: error instanceof Error ? error.message : 'Unknown database error',
    });
  }
});

app.get(['/api/users', '/api/users/'], async (_request, response) => {
  const users = await User.find({}).lean();
  response.json(users);
});

app.get(['/api/teams', '/api/teams/'], async (_request, response) => {
  const teams = await Team.find({}).lean();
  response.json(teams);
});

app.get(['/api/activities', '/api/activities/'], async (_request, response) => {
  const activities = await Activity.find({}).lean();
  response.json(activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('userId', 'name').lean();
  response.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_request, response) => {
  const workouts = await Workout.find({}).lean();
  response.json(workouts);
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

export default app;

startServer();
