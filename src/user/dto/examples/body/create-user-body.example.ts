export const createUserExample = {
  email: 'testuser@example.com',
  firstname: 'john',
  lastname: 'doe',
  middlename: 'jane',
  password: '12345678',
  isStoreOwner: false,
};

export const createStoreOwnerExample = {
  email: 'testuser@example.com',
  firstname: 'john',
  lastname: 'doe',
  middlename: 'jane',
  password: '12345678',
  isStoreOwner: true,
  store: {
    name: 'MyStore',
    description: 'I sell original sneakers',
    address: 'Lagos, Nigeria  ',
  },
};
