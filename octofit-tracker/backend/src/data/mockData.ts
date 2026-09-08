export type ApiRecord = Record<string, unknown>;

export const users: ApiRecord[] = [
  { id: 1, name: 'Ada Johnson', email: 'ada@example.com', role: 'admin' },
  { id: 2, name: 'Sam Lee', email: 'sam@example.com', role: 'member' },
  { id: 3, name: 'Priya Patel', email: 'priya@example.com', role: 'coach' },
];

export const teams: ApiRecord[] = [
  { id: 1, name: 'Trail Blazers', members: 12, sport: 'running' },
  { id: 2, name: 'Velocity Crew', members: 9, sport: 'cycling' },
  { id: 3, name: 'Core Strength', members: 15, sport: 'fitness' },
];

export const activities: ApiRecord[] = [
  { id: 1, userId: 1, type: 'run', durationMinutes: 35, calories: 420 },
  { id: 2, userId: 2, type: 'cycle', durationMinutes: 50, calories: 560 },
  { id: 3, userId: 3, type: 'strength', durationMinutes: 40, calories: 330 },
];

export const leaderboard: ApiRecord[] = [
  { rank: 1, userId: 1, points: 1200, streak: 8 },
  { rank: 2, userId: 2, points: 1105, streak: 6 },
  { rank: 3, userId: 3, points: 980, streak: 4 },
];

export const workouts: ApiRecord[] = [
  { id: 1, title: '5K Tempo Run', difficulty: 'intermediate', durationMinutes: 30 },
  { id: 2, title: 'Full Body HIIT', difficulty: 'advanced', durationMinutes: 25 },
  { id: 3, title: 'Mobility Reset', difficulty: 'beginner', durationMinutes: 20 },
];

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
}
