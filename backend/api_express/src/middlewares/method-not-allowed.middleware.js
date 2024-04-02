const methodNotAllowedMiddleware = (req, res, next) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']

  if (!allowedMethods.includes(req.method)) {
    return res.status(501).json({ error: 'Method not implemented', success: false })
  }

  next()
}

export default methodNotAllowedMiddleware
