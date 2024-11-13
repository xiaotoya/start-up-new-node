import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { createQueryBuilder, DataSource, getManager, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Order } from '@/order/entities/order.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepo: Repository<Customer>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource
  ) {}
    
  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const customerEntity = this.customerRepo.create(createCustomerDto)
    await this.dataSource.manager.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(customerEntity);
    });
    return 'This action adds a new customer: ' + customerEntity.id;
  }

  findOne(id: number) {
    return this.customerRepo.findOneBy({
      id: id
    });
  }

  async findCustomerWithOrder(id: number) {
    const customer = await this.customerRepo.createQueryBuilder('customer')
      .leftJoinAndSelect("customer.orders", "order")
      .where("customer.id = :id", { id: id })
      .getOne();
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customerEntity = this.customerRepo.create(updateCustomerDto);
    await this.dataSource.manager.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.update(Customer, id, customerEntity)
    });
    return `This action updates a #${id} customer`;
  }

  async remove(id: number) {
    const orders = (await this.findCustomerWithOrder(id)).orders;
    await this.dataSource.manager.transaction(async transactionalEntityManager => {
      const ids = orders.map((order) => order.id);
      await transactionalEntityManager.delete(Order, ids);
      await transactionalEntityManager.delete(Customer, id);
    });
    return `This action removes a #${id} customer`;
  }
}

