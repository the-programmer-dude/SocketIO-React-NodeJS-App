import { io } from '../../services/socket'

const allTheMessages = (array, element) => {
    array.map(text => {
        const p = document.createElement('p')
        p.innerText = text
        element.appendChild(p)
    })
}

export default function socketConf(element) {
    if(!element) return
    io.on('join-message', ({ name }) => {
        const p = document.createElement('p')
        p.innerText = `${name} has joined to the chat!`
        element.appendChild(p)
    })
    io.on('all-the-messages', arr => allTheMessages(arr, element))
}