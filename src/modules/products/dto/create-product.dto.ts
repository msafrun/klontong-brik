import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly sku?: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  readonly weight?: number;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsNotEmpty()
  @IsUUID()
  readonly categoryId: string;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
