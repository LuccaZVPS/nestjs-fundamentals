import * as mongoose from 'mongoose';
export const matchSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'players',
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'players',
      },
    ],
    result: { type: Array<{ set: string }>, required: false },
  },
  { collection: 'matchs', timestamps: true },
);
