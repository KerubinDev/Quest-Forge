import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
  IsUUID,
} from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  class?: string;

  @IsString()
  @IsOptional()
  race?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  level?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(30)
  strength?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(30)
  dexterity?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(30)
  constitution?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(30)
  intelligence?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(30)
  wisdom?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(30)
  charisma?: number;

  @IsString()
  @IsOptional()
  skills?: string;

  @IsString()
  @IsOptional()
  history?: string;

  @IsUUID()
  @IsNotEmpty()
  campaignId: string;
}
