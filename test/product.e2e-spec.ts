import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProductModule } from '../src/product/product.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { AuthModule } from '../src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../src/config/configuration';

describe('Product', () => {
  let app: INestApplication;
  let product: any;
  let usertoken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProductModule,
        PrismaModule,
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          cache: true,
        }),
      ],
      providers: [ConfigService],
    }).compile();

    app = module.createNestApplication();
    product = {
      id: expect.any(Number),
      title: expect.any(String),
      image: expect.any(String),
      description: expect.any(String),
      price: expect.any(Number),
      discount: expect.any(Number),
      storeId: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    usertoken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3MDA2NzIxOCwiZXhwIjoxNzAxNjAzMjE4fQ._vefGdeqECyd0wOgPaSUQW6EL8NxhexWM0Rf1zytrII';
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Add Product', () => {
    it('/POST product/store/:storeId adds a new product', () => {
      const newProduct = {
        title: 'Test Product',
        image: 'https://picsum.photos/200',
        description: 'Test Product Description',
        price: 100,
        discount: 10,
      };

      const storeId = 1;

      return request(app.getHttpServer())
        .post(`/product/store/${storeId}`)
        .send(newProduct)
        .set('Authorization', `Bearer ${usertoken}`)
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject(product);
        });
    });

    it('/POST product/store/:storeId returns 403 if user is not store owner', () => {
      const newProduct = {
        title: 'Test Product',
        image: 'https://picsum.photos/200',
        description: 'Test Product Description',
        price: 100,
        discount: 10,
      };

      const storeId = 10;

      return request(app.getHttpServer())
        .post(`/product/store/${storeId}`)
        .send(newProduct)
        .set('Authorization', `Bearer ${usertoken}`)
        .expect(403);
    });
  });

  describe('Fetch Product', () => {
    it('/GET product fetches all added products', () => {
      return request(app.getHttpServer())
        .get('/product')
        .set('accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toMatchObject(product);
        });
    });

    it('/GET product/:id fetches a single product', () => {
      const productId = 1;

      return request(app.getHttpServer())
        .get(`/product/${productId}`)
        .set('accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject(product);
        });
    });
  });
});
