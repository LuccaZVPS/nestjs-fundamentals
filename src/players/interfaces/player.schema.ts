import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Player } from './player.interface';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class PlayerSchema {
  @Prop({ required: true })
  _id: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  ranking: string;
  @Prop({ required: true })
  position: number;
  @Prop({ required: true })
  playerImageUrl: string;
}

export const playerSchema = SchemaFactory.createForClass(PlayerSchema);
