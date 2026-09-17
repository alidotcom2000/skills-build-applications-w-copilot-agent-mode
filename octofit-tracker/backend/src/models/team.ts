import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    motto: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);