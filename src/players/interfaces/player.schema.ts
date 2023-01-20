import * as mongoose from 'mongoose';

export const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    playerImageUrl: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    position: { type: String, required: true },
    ranking: { type: String, required: true },
  },
  { collection: 'players' },
);
