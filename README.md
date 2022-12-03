## Description
SlashCommerce - simple extensible backend for ecommerce application

## Application
- Live URL - [SlashCommerce](https://slashcommerce.onrender.com)
- API Documentation - [SlashCommerce API Documentation](https://slashcommerce.onrender.com/api)
- Note - slash commerce is hosted on a free spot instance that goes standby after 15 minutes of inactivity. This standby is temporary and the system would be resumed on it's first request after the delay period and a 30s delay to restart.

## Dependencies
- yarn - [Yarn package manager](https://classic.yarnpkg.com/lang/en/docs/install/)
- postgres - [Postgres](https://www.postgresql.org/download/)
- cloudinary account - [Cloudinary](https://cloudinary.com/documentation/cloudinary_get_started)
- google account setup with an app password for google smtp - [Google App Password Help](https://support.google.com/accounts/answer/185833?hl=en#:~:text=An%20App%20Password%20is%20a,2%2DStep%20Verification%20turned%20on.)

## Installation
- ### Instructions
  - setup a local database
  - create app passowrd in goolge account
  - create folder in cloudinary account and get auth details 
  - create a .env file with .env.example file and put in appropriate values
  - Install dependencies
    ```bash
    $ yarn install
    ```

  - Migrate database 
    ```bash
    $ yarn prisma migrate dev --name 'initial migration'
    ```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# general e2e tests
$ yarn test:e2e

# e2e test for particular modules
$ yarn test:e2e cart
$ yarn test:e2e product 
```

### Included end to end tests
 - /POST cart/item adds a new product to cart
 - /POST cart/item adds a new product to cart should add to quantity if product already exists
 - /GET cart/total should return total price of cart
 - /GET cart/total should return discounted total if quantity is > 3
 - /POST product/store/:storeId adds a new product
 - /POST product/store/:storeId returns 403 if user is not store owner
 - /GET product fetches all added products
 - /GET product/:id fetches a single product

## Stay in touch

- Author - [Chidiebere Nwachukwu](https://www.linkedin.com/in/chidi-godwin/)
- Website - [https://www.linkedin.com/in/chidi-godwin/](https://www.linkedin.com/in/chidi-godwin/)
- Twitter - [@chidi_godwn](https://twitter.com/chidi_godwn)

