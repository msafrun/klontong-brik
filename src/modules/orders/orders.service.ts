import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { createLogs } from 'src/helpers/logger';
import { TABLES } from 'src/common/constants/tables';
import { METHODS } from 'src/common/constants/https';
import { ORDER_STATUS } from 'src/common/constants/orders';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    readonly ordersRepository: Repository<Order>,

    @InjectRepository(Product)
    readonly productsRepository: Repository<Product>,
  ) {}

  private _generateTrxNumber(): string {
    const now = new Date();
    const formattedDate = now
      .toISOString()
      .replace(/[-T:.Z]/g, '')
      .slice(0, 14);
    const trxCode = `TRX-${formattedDate}`;

    return trxCode;
  }

  async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;

    let totalAmount: number = 0;

    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    const productIds = items?.map((v: any) => v.id);

    const getProducts = await this.productsRepository.find({
      where: {
        id: In(productIds),
      },
      select: {
        id: true,
        price: true,
        title: true,
        sku: true,
      },
    });

    if (getProducts?.length !== items?.length)
      throw new BadRequestException('Some items are not found');

    items?.forEach((item: any) => {
      const matchId = getProducts.find((f) => f.id === item.id);

      if (matchId) totalAmount += item.qty * matchId.price;
    });

    const createOrder = await this.ordersRepository.save({
      amount: totalAmount,
      items: getProducts,
      trx_expiry: expiryTime,
      trx_number: this._generateTrxNumber(),
    });

    return { data: createOrder };
  }

  async createPayment(createPaymentOrderDto: UpdateOrderDto) {
    const { amount, trx_number } = createPaymentOrderDto;

    const getOrder = await this.ordersRepository.findOne({
      where: {
        trx_number: trx_number,
      },
    });

    if (!getOrder || getOrder.order_status === ORDER_STATUS.COMPLETE)
      throw new NotFoundException('Order not found or is already complete');

    const now = new Date();
    const expiry = new Date(getOrder.trx_expiry);

    createPaymentOrderDto.updated_at = new Date();

    const payload = this.ordersRepository.merge(
      getOrder,
      createPaymentOrderDto,
    );

    if (now > expiry || Number(amount) !== Number(getOrder.amount)) {
      payload.order_status = ORDER_STATUS.FAILED;
      await this.ordersRepository.save(payload);

      createLogs(
        {
          id: getOrder.id,
          order_status: ORDER_STATUS.FAILED,
        },
        TABLES.ORDERS,
        METHODS.POST,
      );

      throw new BadRequestException('Order is expired or wrong amount');
    }

    payload.order_status = ORDER_STATUS.COMPLETE;
    const updateOrder = await this.ordersRepository.save(payload);

    createLogs(
      {
        id: getOrder.id,
        order_status: ORDER_STATUS.COMPLETE,
      },
      TABLES.ORDERS,
      METHODS.POST,
    );

    return { data: updateOrder };
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
