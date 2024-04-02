const notFoundEndpoint = (_req, res) => {
  res.status(404).json({ error: 'Endpoint not found', success: false })
}

export default notFoundEndpoint
