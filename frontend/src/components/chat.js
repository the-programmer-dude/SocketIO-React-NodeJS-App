import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { DELETE } from '../services/fetch'
import { key } from '../json/key'

export const Chat = ({ currentState, location, dispatch }) => {
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem(key))

    if(currentState.error) {
        history.push('/user', { alert: 'error' })
    }

    useEffect(() => {
        if(currentState.alert === 'deleted') {
            history.push('/user', { alert: 'logged-out' })
        }
    }, [currentState, history])

    return (
        <>
        <h1>Welcome to the chat</h1>
        <button className="btn btn-success" onClick={() => { DELETE('/user', user.name)(dispatch); history.push('/user')} }>Log Out</button>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentState:  state.userReducer
})

export default connect(mapStateToProps)(Chat)

