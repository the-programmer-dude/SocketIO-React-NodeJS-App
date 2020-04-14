const socketIO = require('socket.io')
const user = require('./json/users.json')

exports.loadSocketIO = (server) => {
    const io = socketIO.listen(server)

    io.on('connection', socket => {
        const messages = []
        if(socket.handshake.query.name) {
            let { name } = socket.handshake.query
            user.users.map(plr => {
                if(plr.name === name && !plr.alreadyListed) {
                    messages.push(`${name} has joined to the chat`)
                    plr.alreadyListed = true

                    if(user.users.length === 0) {
                        io.emit('join-message', {
                            name
                        })
                    }else{
                        io.emit('all-the-messages', messages)
                    }
                }
            })
        }

        io.on('get-messages', () => {
            io.emit('all-the-messages', messages)
        })
    })
}