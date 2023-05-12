import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class AppRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'OK' })
  readonly message: string;
}
