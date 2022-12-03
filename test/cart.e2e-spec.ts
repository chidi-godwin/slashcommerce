/* eslint-disable @typescript-eslint/no-unused-vars */
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CartService } from '../src/cart/cart.service';
import { CartModule } from '../src/cart/cart.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/config/configuration';
import { AuthModule } from '../src/auth/auth.module';

describe('Cart', () => {
  let app: INestApplication;
  let service: CartService;
  let cart: any;
  let cartItem: any;
  let usertoken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CartModule,
        PrismaModule,
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          cache: true,
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<CartService>(CartService);
    cart = {
      id: expect.any(Number),
      userId: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      cartItems: expect.any(Array),
    };

    cartItem = {
      id: expect.any(Number),
      cartId: expect.any(Number),
      productId: expect.any(Number),
      quantity: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    // change this to vaild user token to resolve 401 error
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

  describe('Add to Cart', () => {
    it('/POST cart/item adds a new product to cart', () => {
      const newCartItem = {
        productId: 1,
        quantity: 1,
      };

      return request(app.getHttpServer())
        .post('/cart/item')
        .send(newCartItem)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toMatchObject(cartItem);
        });
    });

    it('/POST cart/item adds a new product to cart should add to quantity if product already exists', async () => {
      const newCartItem = {
        productId: 1,
        quantity: 1,
      };

      const oldQuantity = await request(app.getHttpServer())
        .post('/cart/item')
        .send(newCartItem)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .then((res) => {
          return +res.body.quantity;
        });

      return request(app.getHttpServer())
        .post('/cart/item')
        .send(newCartItem)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toMatchObject(cartItem);
          expect(body.quantity).toBe(oldQuantity + newCartItem.quantity);
        });
    });

    describe('Calculate Cart Total', () => {
      it('/GET cart/total should return total price of cart', async () => {
        return request(app.getHttpServer())
          .get('/cart/total')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${usertoken}`)
          .expect(200)
          .expect(({ body }) => {
            expect(body).toMatchObject({
              total: expect.any(Number),
            });
          });
      });

      it('/GET cart/total should return discounted total if quantity is > 3', async () => {
        const newCartItem = {
          productId: 1,
          quantity: 4,
        };

        // clear cart
        await request(app.getHttpServer())
          .delete('/cart')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${usertoken}`);

        // add new cart item

        await request(app.getHttpServer())
          .post('/cart/item')
          .send(newCartItem)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${usertoken}`);

        // get cart item by product id
        const cartItem = await request(app.getHttpServer())
          .get(`/cart/item/product/${newCartItem.productId}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${usertoken}`)
          .then((res) => {
            return res.body;
          });

        // get product price and discount
        const { price, discount } = cartItem.product;

        // get quantity of cart item
        const { quantity } = cartItem;

        // calculate discounted price
        const discountedPrice = price - price * (discount / 100);

        // calculate total price
        const total = discountedPrice * quantity;

        return request(app.getHttpServer())
          .get('/cart/total')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${usertoken}`)
          .expect(200)
          .expect(({ body }) => {
            expect(body).toMatchObject({
              total: expect.any(Number),
            });
            expect(body.total).toBe(total);
          });
      });
    });
  });
});
