export const config = () => ({
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/entities/*.entity.js'],
    synchronize: true,
    ssl: { rejectUnauthorized: false },
  },
});
