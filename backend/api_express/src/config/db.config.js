import { Sequelize } from 'sequelize'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root_password',
  db: 'book_managment',
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
      console.log('Connection has been established successfully.')
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    })
}

export function closeDB() {
  db.close()
}
