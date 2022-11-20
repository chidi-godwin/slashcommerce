export const loginUserExampleResponse = {
  user: {
    id: 4,
    email: 'testuser@example.com',
    firstname: 'test',
    lastname: 'user',
    middlename: 'test',
    role: 'USER',
    createdAt: '2022-11-19T15:23:36.457Z',
    updatedAt: '2022-11-19T15:23:36.457Z',
  },
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg5MTAyODIsImV4cCI6MTY2ODk5NjY4Mn0.mtsDQkws1LAWMVgAmras9PGjpFuEcR5IdM-WHYaj1QA',
};

export const loginUserExampleBody = {
  email: 'testuser@example.com',
  password: '12345678',
};
