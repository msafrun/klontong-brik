import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { ENV_VARIABLES } from '../constants/env';

export const dbConfig: TypeOrmModule = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModule> => {
    return {
      type: 'postgres',
      database: configService.get<string>(ENV_VARIABLES.DB_NAME),
      host: configService.get<string>(ENV_VARIABLES.DB_HOST),
      port: configService.get<number>(ENV_VARIABLES.DB_PORT),
      username: configService.get<string>(ENV_VARIABLES.DB_USERNAME),
      password: configService.get<string>(ENV_VARIABLES.DB_PASSWORD),
      schema: 'public',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  schema: 'public',
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  logging: ['query', 'error'],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
