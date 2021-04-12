import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import 'dotenv/config';

const {
  ENVIRONMENT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

console.log("Host: ", DATABASE_HOST);


@Injectable()
class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: DATABASE_HOST,
      port: Number(DATABASE_PORT),
      username: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: ['dist/entities/*.entity.js'],
      synchronize: true,
      ssl: ENVIRONMENT === 'DEV' ? { rejectUnauthorized: false } : false,
    };
  }
}

const dbConnectionService = new DatabaseConnectionService();

export { dbConnectionService };
