import mongoose, { Schema, type InferSchemaType, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    age: Number,
    fitnessLevel: String,
  },
  { collection: 'users', timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: { type: Number, default: 0 },
    captain: String,
    city: String,
  },
  { collection: 'teams', timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    distanceKm: Number,
    date: { type: Date, default: Date.now },
  },
  { collection: 'activities', timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    week: { type: String, default: 'current' },
  },
  { collection: 'leaderboard', timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, default: 'general' },
    equipment: [String],
    description: String,
  },
  { collection: 'workouts', timestamps: true },
);

export type UserType = InferSchemaType<typeof userSchema>;
export type TeamType = InferSchemaType<typeof teamSchema>;
export type ActivityType = InferSchemaType<typeof activitySchema>;
export type LeaderboardEntryType = InferSchemaType<typeof leaderboardEntrySchema>;
export type WorkoutType = InferSchemaType<typeof workoutSchema>;

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = model('Workout', workoutSchema);
