import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  setting?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
