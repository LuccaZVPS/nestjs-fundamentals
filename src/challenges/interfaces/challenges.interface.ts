import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { Match } from './matchs.interface';
export interface Challenges extends Document {
  challengeDate: Date;
  challengeSolicitationDate: Date;
  challengeResponseDate: Date;
  category: string;
  status: 'PENDENTE' | 'REALIZADO' | 'NEGADO';
  players: Array<Player>;
  match: Match;
  challenger: Player;
}
