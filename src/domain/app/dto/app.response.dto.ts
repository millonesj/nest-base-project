import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AppResponseDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'OK' })
  readonly message: string;
}
