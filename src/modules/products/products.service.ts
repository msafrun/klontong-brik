import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, request: any) {
    const user = request?.user;

    const { title, sku, weight, categoryId, description, image, price } =
      createProductDto;

    const createProduct = await this.productsRepository.save({
      title,
      sku: sku ?? null,
      weight,
      category: {
        id: categoryId,
      },
      description,
      image:
        image ?? 'https://cdn-icons-png.flaticon.com/512/13434/13434972.png',
      price,
      profile: {
        id: user?.id,
      },
    });

    return { data: createProduct };
  }

  async findAll(query: any) {
    const { offset = 0, limit = 10, sort = 'desc', search } = query;

    const getAllPeoduct = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .skip(offset)
      .take(limit)
      .orderBy('product.created_at', sort.toUpperCase() as 'ASC' | 'DESC');

    if (search) {
      getAllPeoduct.where(
        'product.title ILIKE :search OR product.description ILIKE :search OR category.title ILIKE :search',
        { search: `%${search}%` },
      );
    }

    const [data, total] = await getAllPeoduct.getManyAndCount();

    return {
      data,
      meta: { total, offset: Number(offset), limit: Number(limit) },
    };
  }

  async findOne(id: string) {
    const getProduct = await this.productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!getProduct) throw new NotFoundException();

    return {
      data: getProduct,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto, request: any) {
    const user = request?.user;

    const getProduct = await this.productsRepository.findOne({
      where: {
        id,
        profile: { id: user?.id },
      },
      relations: ['profile', 'category'],
    });

    if (!getProduct) throw new NotFoundException('Product not found');

    updateProductDto.updated_at = new Date();

    const payload = this.productsRepository.merge(getProduct, updateProductDto);

    const updateProduct = await this.productsRepository.save(payload);

    delete updateProduct.profile;
    delete updateProduct.category;

    return { data: updateProduct };
  }

  async remove(id: string, request: any) {
    const user = request?.user;

    const getProduct = await this.productsRepository.findOne({
      where: {
        id,
      },
      relations: ['profile'],
    });

    if (!getProduct) throw new NotFoundException('Product not found');
    if (getProduct.profile.id !== user?.id)
      throw new ForbiddenException(`You are not the owner of current product`);

    await this.productsRepository.remove(getProduct);

    return {
      data: {
        id: getProduct.id,
      },
    };
  }
}
