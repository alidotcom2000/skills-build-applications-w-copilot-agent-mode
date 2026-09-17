import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya@example.com', avatar: 'MC', goal: 'Build strength' },
      { name: 'Jordan Brooks', email: 'jordan@example.com', avatar: 'JB', goal: 'Run a 10K' },
      { name: 'Priya Shah', email: 'priya@example.com', avatar: 'PS', goal: 'Improve mobility' },
    ]);

    const teams = await Team.create([
      { name: 'Peak Performers', motto: 'Small steps, strong finish', members: [users[0]._id, users[1]._id], totalPoints: 1860 },
      { name: 'Wellness Wave', motto: 'Move better together', members: [users[2]._id], totalPoints: 920 },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Strength training', durationMinutes: 45, calories: 380, completedAt: new Date('2026-09-15') },
      { user: users[1]._id, type: 'Outdoor run', durationMinutes: 38, calories: 420, completedAt: new Date('2026-09-16') },
      { user: users[2]._id, type: 'Yoga flow', durationMinutes: 30, calories: 180, completedAt: new Date('2026-09-16') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 1040, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 820, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 920, rank: 3 },
    ]);

    await Workout.create([
      { title: 'Full-body foundation', focus: 'Strength', difficulty: 'Beginner', durationMinutes: 25, exercises: ['Squats', 'Incline push-ups', 'Dead bugs'] },
      { title: 'Runner recovery', focus: 'Mobility', difficulty: 'Intermediate', durationMinutes: 20, exercises: ['Hip flexor stretch', 'Calf stretch', 'Pigeon pose'] },
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
