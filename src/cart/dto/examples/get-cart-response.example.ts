export const GET_CART_RESPONSE_EXAMPLE = {
  id: 2,
  userId: 22,
  createdAt: '2022-12-01T02:39:59.827Z',
  updatedAt: '2022-12-01T02:39:59.827Z',
  cartItems: [
    {
      id: 1,
      cartId: 2,
      productId: 2,
      quantity: 2,
      createdAt: '2022-12-01T03:05:26.456Z',
      updatedAt: '2022-12-01T03:05:26.456Z',
    },
    {
      id: 2,
      cartId: 2,
      productId: 4,
      quantity: 2,
      createdAt: '2022-12-01T03:07:08.768Z',
      updatedAt: '2022-12-01T03:07:08.768Z',
    },
    {
      id: 3,
      cartId: 2,
      productId: 1,
      quantity: 2,
      createdAt: '2022-12-01T03:07:48.363Z',
      updatedAt: '2022-12-01T03:07:48.363Z',
    },
  ],
};

export const ADD_ITEM_TO_CART_RESPONSE_EXAMPLE = {
  id: 4,
  cartId: 2,
  productId: 5,
  quantity: 1,
  createdAt: '2022-12-01T04:31:59.918Z',
  updatedAt: '2022-12-01T04:31:59.918Z',
  product: {
    id: 5,
  },
};
