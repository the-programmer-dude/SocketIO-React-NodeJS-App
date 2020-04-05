import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { logOut } from '../store/actions'
import { useHistory } from 'react-router-dom'

export const Chat = ({ currentState, logOut }) => {
    const [ error, setError ] = useState({ error: false, status: 200 })
    const history = useHistory()

    useEffect(() => {
        async function load() {
            const response = await currentState
            if(response.action === 'delete' && response.status === 200) {
                history.push('/user', {
                    success: true,
                    message: 'Logged out'
                })
            }else if(response.status === 404 && response.action === 'none'){
                setError(response)
            }
        }
        load()
    }, [currentState, history])

    

    return (
        <>
        { error && error.status !== 200 ? (
            <div className="alert alert-danger">{error.message}</div>
        ) : null }
        <h1>Welcome to the chat</h1>
        <button onClick={() => logOut(currentState.name)}>Log Out</button>
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

