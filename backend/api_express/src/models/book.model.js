import {
  STRING,
  INTEGER,
} from 'sequelize'
import { db } from '../config/db.config.js'

const Book = db.define('book', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
})

Book.sync({ alter: true })

export default Book
