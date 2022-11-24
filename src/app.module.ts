import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getOrmConfig } from './configs/orm.config';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getOrmConfig
    }),
    TagModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}