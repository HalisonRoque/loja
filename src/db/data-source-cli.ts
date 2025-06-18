import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  entities: [join(__dirname, '/.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations/*.{ts,js}')],
};
console.log('Entities:', dataSourceOptions.entities);
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
