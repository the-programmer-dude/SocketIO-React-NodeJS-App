import socket from 'socket.io-client'
export const io = socket('http://localhost:9532/', {
    autoConnect: false
})

export const connectToServer = (name) => {
    if(io.disconnected) {
        io.io.opts.query = { name }
        io.connect()
    }
}

export const disconnectFromServer = () => {
    if(io.connected) io.disconnect()
}