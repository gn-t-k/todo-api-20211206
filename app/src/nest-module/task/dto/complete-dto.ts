import { IsNotEmpty, IsString } from 'class-validator';

export class CompleteDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
