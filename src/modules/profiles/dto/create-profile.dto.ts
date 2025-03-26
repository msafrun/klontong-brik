import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 24)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 24)
  readonly password: string;
}
