import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Ada Johnson',
        email: 'ada@example.com',
        role: 'admin',
        age: 29,
        fitnessLevel: 'advanced',
      },
      {
        name: 'Sam Lee',
        email: 'sam@example.com',
        role: 'member',
        age: 31,
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Priya Patel',
        email: 'priya@example.com',
        role: 'coach',
        age: 34,
        fitnessLevel: 'advanced',
      },
      {
        name: 'Marco Silva',
        email: 'marco@example.com',
        role: 'member',
        age: 27,
        fitnessLevel: 'beginner',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        sport: 'running',
        members: 12,
        captain: users[0].name,
        city: 'Seattle',
      },
      {
        name: 'Velocity Crew',
        sport: 'cycling',
        members: 9,
        captain: users[1].name,
        city: 'Austin',
      },
      {
        name: 'Core Strength',
        sport: 'fitness',
        members: 15,
        captain: users[2].name,
        city: 'Denver',
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        durationMinutes: 35,
        calories: 420,
        distanceKm: 5.2,
        date: new Date('2026-09-01T06:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'cycle',
        durationMinutes: 50,
        calories: 560,
        distanceKm: 18.4,
        date: new Date('2026-09-03T18:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'strength',
        durationMinutes: 40,
        calories: 330,
        date: new Date('2026-09-05T07:15:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'walk',
        durationMinutes: 28,
        calories: 180,
        distanceKm: 3.1,
        date: new Date('2026-09-06T08:05:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, userId: users[0]._id, points: 1200, streak: 8, week: 'current' },
      { rank: 2, userId: users[1]._id, points: 1105, streak: 6, week: 'current' },
      { rank: 3, userId: users[2]._id, points: 980, streak: 4, week: 'current' },
      { rank: 4, userId: users[3]._id, points: 890, streak: 3, week: 'current' },
    ]);

    await Workout.insertMany([
      {
        title: '5K Tempo Run',
        difficulty: 'intermediate',
        durationMinutes: 30,
        focus: 'cardio',
        equipment: ['running shoes'],
        description: 'A sustained interval run designed to improve pace and endurance.',
      },
      {
        title: 'Full Body HIIT',
        difficulty: 'advanced',
        durationMinutes: 25,
        focus: 'strength',
        equipment: ['dumbbells', 'mat'],
        description: 'Explosive circuit exercises to build power and stamina.',
      },
      {
        title: 'Mobility Reset',
        difficulty: 'beginner',
        durationMinutes: 20,
        focus: 'recovery',
        equipment: ['mat'],
        description: 'Gentle stretching sequence to improve flexibility and recovery.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
