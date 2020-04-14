const express = require('express')
const cors = require('cors')

const { loadSocketIO } = require('./io')
const routes = require('./services/routes')

const app = express()
const server = require('http').Server(app)

loadSocketIO(server)

app.use(express.json())
app.use(cors())
app.use(routes)

const PORT = 9532
server.listen(PORT, () => console.log(PORT))