import { PlayerSchema } from './player.schema';

export interface Player extends PlayerSchema {
  readonly _id: string;
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  position: number;
  playerImageUrl: string;
}
