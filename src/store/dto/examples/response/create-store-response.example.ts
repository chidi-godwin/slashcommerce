export const createStoreSuccessResponseExample = {
  id: 6,
  name: 'Versace',
  address: 'Milan, Italy',
  description: 'every empire has a rise and fall',
  userId: 4,
  createdAt: '2022-11-21T22:33:47.867Z',
  updatedAt: '2022-11-21T22:33:47.867Z',
  user: {
    id: 4,
  },
};

export const createStoreErrorResponseExample = {
  statusCode: 400,
  message: ['Store already exists. Choose another name.'],
  error: 'Bad Request',
};
