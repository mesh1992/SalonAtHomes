import { IsString, IsOptional, IsDateString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  readonly gender?: string;

  @Exclude()
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;
}
