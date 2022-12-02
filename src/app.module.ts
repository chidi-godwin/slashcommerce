import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CartModule } from './cart/cart.module';
import { MailModule } from './mail/mail.module';
import configuration from './config/configuration';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PrismaModule,
    StoreModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    ProductModule,
    CloudinaryModule,
    CartModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
