import * as mongoose from 'mongoose';
export const categorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    events: [
      {
        name: { type: String },
        operation: { type: String },
        value: { type: Number },
      },
    ],
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'players' }],
  },
  { timestamps: true, collection: 'categories' },
);
