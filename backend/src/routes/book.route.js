import express from 'express'
import Book from '../models/book.model.js'

const router = express.Router()

router.get('/book', async (_req, res) => {
  try {
    const books = await Book.findAll()
    res.status(200).json({ data: books, success: true })
  } catch (error) {
    res.status(500).json({ error: error.message, success: false })
  }
})

export default router
