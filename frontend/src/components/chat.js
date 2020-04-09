import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { logOut } from '../store/actions'
import { useHistory } from 'react-router-dom'
import { key } from '../json/key'

export const Chat = ({ currentState, logOut, location }) => {
    const [ error, setError ] = useState({ error: false, status: 200 })
    const history = useHistory()
    console.log(JSON.parse(localStorage.getItem(key)))
    useEffect(() => {
        if(currentState.action === 'delete' && currentState.status === 200) {
            history.push('/user', {
                success: true,
                message: currentState.message
            })
        }else if(currentState.status === 404 && currentState.action === 'none'){
            setError(currentState)
        }
    }, [currentState, history])

    return (
        <>
        { error && error.status !== 200 ? (
            <div className="alert alert-danger">{error.message}</div>
        ) : null }
        <h1>Welcome to the chat</h1>
        <button className="btn btn-success" onClick={() => logOut(currentState.name)}>Log Out</button>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentState:  state.userReducer
})

const mapToDispatchProps = (dispatch) => ({
    logOut: playername =>  dispatch(logOut(playername))
})

export default connect(mapStateToProps, mapToDispatchProps)(Chat)

