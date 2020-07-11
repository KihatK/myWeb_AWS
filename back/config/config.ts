import dotenv from 'dotenv';

dotenv.config();

type IConfig = {
  username: string,
  password: string | undefined,
  database: string,
  [index: string]: any,
};

interface IConfigGroup {
  development: IConfig,
  test: IConfig,
  production: IConfig,
};

const config: IConfigGroup = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "myWeb_dev",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "dmyWeb_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "myWeb_product",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}

export default config;

// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "myWeb_dev",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "myWeb_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "myWeb_product",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   }
// }