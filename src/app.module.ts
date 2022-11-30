import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getOrmConfig } from './configs/orm.config';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getOrmConfig
    }),
    TagModule,
    UserModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
