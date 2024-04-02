import { Sequelize } from 'sequelize'

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  db: process.env.DATABASE,
  dialect: 'mysql',
  logging: false,
}

export const db = new Sequelize(
  config.db,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging,
  },
)

export function connectDB() {
  db.authenticate()
    .then(() => {
      console.log('Database connected successfully.')
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    })
}

export function closeDB() {
  db.close()
}
