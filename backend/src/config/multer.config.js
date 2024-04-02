import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(dirname, '../public/images'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('Not a image file'), false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5,
}

const upload = multer({ storage, fileFilter, limits })

export default upload
