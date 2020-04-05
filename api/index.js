const express = require('express')
const cors = require('cors')
const http = require('http')

const { loadSocketIO } = require('./io')
const routes = require('./services/routes')

const app = express()
const server = http.Server(app)

loadSocketIO(server)

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(routes)

const PORT = 9430
server.listen(PORT, () => console.log(PORT))