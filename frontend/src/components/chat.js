import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { connectToServer, disconnectFromServer, io } from '../services/socket'
import { DELETE } from '../services/fetch'
import { key } from '../json/key'
import socketConf from './chat-components/socketHandler'

import './chat-components/style.css'

export const Chat = ({ currentState, dispatch }) => {
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem(key))

    const chatBoxRef = useRef(false)
    const [ inptValue, setValue ] = useState('')

    if(currentState.error || JSON.stringify(user) === '{}') {
        history.push('/user')
    }

    useEffect(() => {
        connectToServer(user.name)
    })

    useEffect(() => {
        const localstorageData = JSON.parse(localStorage.getItem(key))
        if(localstorageData.status === 'logged-out' || localstorageData.error) {
            history.push('/user')
        } 
    }, [user, history])

    useEffect(() => {
        if(currentState.alert === 'deleted') {
            history.push('/user')
        }
    }, [currentState, history])
    //chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight

    function handleUserDisconnection() {
        DELETE('/user', user.name)(dispatch) 
        disconnectFromServer()
        history.push('/user')
    }

    function handleSendMessage() {
        io.emit('message', inptValue)
    }

    useEffect(() => {
        socketConf(chatBoxRef.current)
    }, [chatBoxRef])

    return (
        <>
        <h3 className="mb-sm-5">Welcome to the chat, you are logged as '{user.name}'</h3>

        <div className="jumbotron">
            <div className="chat-box" ref={chatBoxRef}></div>
            <input 
            className='send-box' 
            type="text" 
            placeholder="Start typing"
            value={inptValue}
            onChange={({target}) => setValue(target.value)}
            />
            <button className="btn btn-success ml-3 send-button" onClick={handleSendMessage}>Send Message</button>
        </div>

        <button className="btn btn-success mt-4" onClick={handleUserDisconnection}>Log Out</button>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentState:  state.userReducer
})

export default connect(mapStateToProps)(Chat)

