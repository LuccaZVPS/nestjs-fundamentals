import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';

export interface Match extends Document {
  category: string;
  winner: Player;
  players: Array<Player>;
  result: Array<{ set: string }>;
}
