import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepo: Repository<Order>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource
  ) {}
  async AddOrderToCustomer(createOrderDto: CreateOrderDto) {
    const orderEntity = this.orderRepo.create(createOrderDto);
    await this.dataSource.manager.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(orderEntity);
    });
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOrderWithCustomer(id: number) {
    const order = await this.orderRepo.createQueryBuilder('order')
      .innerJoinAndSelect("order.customer_id", "customer")
      .where("order.id = :id", { id: id })
      .getOne();
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
