import { Player } from 'src/players/interfaces/player.interface';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';
export class CreateChallengeDTO {
  @IsNotEmpty()
  @IsDateString()
  challengeDate: Date;
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<{ _id: string }>;
  @IsNotEmpty()
  @IsString()
  challenger: string;
}
