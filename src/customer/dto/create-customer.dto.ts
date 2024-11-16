import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
export class CreateCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    gender: 'man' | 'woman';
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    age: number;
}
