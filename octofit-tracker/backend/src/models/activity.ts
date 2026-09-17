import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);