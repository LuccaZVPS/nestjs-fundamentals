import * as mongoose from 'mongoose';

export const challengeSchema = new mongoose.Schema(
  {
    challengeDate: { type: Date, required: false },
    challengeSolicitationDate: { type: Date, required: false },
    challengeResponseDate: { type: Date, required: false },
    category: { type: String, required: false },
    status: { type: String, required: false },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'players',
      },
    ],
    challenger: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'players',
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'matchs',
    },
  },
  { collection: 'challenges' },
);
