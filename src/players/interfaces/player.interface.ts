import { Document } from 'mongoose';
import { playerSchema } from './player.schema';

export interface Player {
  readonly _id: string;
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  position: number;
  playerImageUrl: string;
}
