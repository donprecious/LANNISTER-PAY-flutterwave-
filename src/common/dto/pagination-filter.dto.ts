import { Type } from "class-transformer";
import { IsInt, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class PaginationFilterDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number;

  constructor() {
    this.limit = 20;
    this.page = 1;
  }
}