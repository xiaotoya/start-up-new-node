import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "@/customer/entities/customer.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number;
    @Column({type: 'varchar', length: 50})
    name: string;
    @Column({type: 'varchar', length: 50})
    description: string;
    
    @ManyToOne(() => Customer)
    @JoinColumn()
    customer_id: number;
}