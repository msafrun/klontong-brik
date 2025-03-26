import {
  IsDate,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly items: any;

  @IsOptional()
  @IsString()
  order_status?: string;

  @IsOptional()
  @IsString()
  trx_number?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsDate()
  trx_expiry?: Date;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
