import socket from 'socket.io-client'
const io = socket('http://localhost:9430/', {
    autoConnect: false
})

export const connectToServer = () => {
    io.connect()
}

export const disconnectFromServer = () => {
    if(io.connected) io.disconnect()
}