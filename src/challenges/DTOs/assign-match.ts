import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
export class AssignMatchDTO {
  @IsNotEmpty()
  @IsString()
  winner: string;
  @ArrayMinSize(1)
  @IsArray()
  result: Array<{ set: string }>;
}
