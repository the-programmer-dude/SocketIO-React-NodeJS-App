import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { DELETE } from '../services/fetch'
import { key } from '../json/key'

export const Chat = ({ currentState, dispatch }) => {
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem(key))

    if(currentState.error || JSON.stringify(user) === '{}') {
        history.push('/user')
    }

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

    return (
        <>
        <h3>Welcome to the chat, you are logged as '{user.name}'</h3>

        <button className="btn btn-success" onClick={() => { DELETE('/user', user.name)(dispatch); history.push('/user')} }>Log Out</button>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentState:  state.userReducer
})

export default connect(mapStateToProps)(Chat)

