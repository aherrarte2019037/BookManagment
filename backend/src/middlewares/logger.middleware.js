import fs from 'fs'

const loggerMiddleware = (req, res, next) => {
  const originalSend = res.send

  res.send = function builder(data) {
    const timestamp = new Date().toLocaleString()
    const { method } = req
    const route = req.originalUrl
    const payload = JSON.stringify(req.body)
    const logEntry = `Timestamp: ${timestamp}\nMethod: ${method}\nRoute: ${route}\nPayload: ${payload}\nResponse: ${data}\n\n`

    if (!route.includes('api/docs/')) {
      fs.appendFile('src/output/log.txt', logEntry, (err) => {
        if (err) throw err
      })
    }

    originalSend.call(this, data)
  }
  next()
}

export default loggerMiddleware
