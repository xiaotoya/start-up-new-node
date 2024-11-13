import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "@/order/entities/order.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 50})
    name: string;
    @Column({type: 'char', length: 10})
    gender: 'man' | 'woman';
    @Column({type: 'char', length: 10})
    age: number;
    @OneToMany(() => Order, order => order.customer_id)
    @JoinColumn()
    orders: Order[];
}
