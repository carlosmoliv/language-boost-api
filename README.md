<p align="center">
  <img src="https://carlosmoliveira.com/nodejs.png" width="230" aly="Node Logo"/>
</p>

<h1 align="center">Knowledge Boost Courses - API (under construction)</h1>

## :rocket: About the project

A Node.js **Role-Based** REST API for a courses platform with payments via **Stripe**, that I'm developing from scratch for study purposes.

The idea is to apply **DDD**, **Clean Architecture**, **TDD**, and also stay up-to-date with the **latest trends**.

My main focus with this project is the **back-end** for the moment, but I have plans to start the frontend using React in another repository.

## :dart: Mind Map, Storyboard, and Data modeling

- Mind Map: https://miro.com/app/board/uXjVMfni4k8=/?share_link_id=498114699109 **(under construction)**
- Storyboard: **Check back later for updates.**
- Data Modeling: **Check back later for updates.**

## :toolbox: Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Typegoose](https://typegoose.github.io/typegoose/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Joi](https://joi.dev/)
- [Pino](https://getpino.io/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Docker](https://www.docker.com/)
- CI/CD
- Documentantion

## Stripe API
- [Stripe Checkout Docs] https://stripe.com/docs/payments/checkout

## :gear: Installation

Use a `yarn` or `npm` in order to install all dependencies

```bash
yarn
```

Create and config `.env` file using `.env.example` as a example

## :computer: Usage

To start the development server, simply run the `dev` command

```bash
yarn dev
```

To run only unit tests, use the `test:unit` command.

```bash
yarn test:unit
```

To run only integration tests, use the `test:integration` command.

```bash
yarn test:integration
```

To run all test suites, use the `test` command. To run in watch mode just run `test:watch`

```bash
yarn test
```

```bash
yarn test:watch
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
