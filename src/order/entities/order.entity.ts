import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "@/customer/entities/customer.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 50})
    name: string;
    @Column({type: 'varchar', length: 50})
    description: string;
    
    @ManyToOne(() => Customer)
    @JoinColumn()
    customer_id: number;
}