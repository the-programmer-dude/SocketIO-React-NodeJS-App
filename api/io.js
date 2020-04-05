const socketIO = require('socket.io')

exports.loadSocketIO = (server) => {
    const io = socketIO(server)

    io.on('connection', socket => {
        console.log(socket.id)
    })
}