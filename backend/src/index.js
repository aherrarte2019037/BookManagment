import express, { json, urlencoded } from 'express'
import cors from 'cors'
import path from 'path'
import 'dotenv/config'
import { fileURLToPath } from 'url'
import bookRoutes from './routes/book.route.js'
import loggerMiddleware from './middlewares/logger.middleware.js'
import methodNotAllowedMiddleware from './middlewares/method-not-allowed.middleware.js'
import notFoundEndpoint from './middlewares/not-found.middleware.js'
import { connectDB } from './config/db.config.js'

const app = express()
const port = 3000

connectDB()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

// Uploads folder
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
app.use('/uploads', express.static(path.join(dirname, 'public')))

// Middlewares
app.use(loggerMiddleware)
app.use(methodNotAllowedMiddleware)

// Routes
app.use('/api', bookRoutes)

// Not found middleware
app.use(notFoundEndpoint)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
