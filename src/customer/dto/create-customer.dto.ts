import { IsInt, IsNotEmpty } from 'class-validator';
export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    gender: 'man' | 'woman';
    @IsNotEmpty()
    @IsInt()
    age: number;
}
