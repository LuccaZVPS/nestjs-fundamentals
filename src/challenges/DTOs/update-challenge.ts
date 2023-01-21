import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
export class UpdateChallengeDTO {
  @IsNotEmpty()
  @IsDateString()
  challengeDate: Date;
  @IsNotEmpty()
  @IsString()
  status: 'PENDENTE' | 'ACEITO' | 'NEGADO';
}
