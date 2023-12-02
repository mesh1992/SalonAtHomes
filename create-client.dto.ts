import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsEmail,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  readonly gender?: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly address: string;
}
