import {ConfigService} from '@nestjs/config';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const getOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('SERVER'),
    port: parseInt(configService.get('ORM_PORT')),
    username: configService.get('ORM_USERNAME'),
    password: configService.get('ORM_PASSWORD'),
    database: configService.get('ORM_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  }
};
