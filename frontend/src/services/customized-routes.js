import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    Route,
    useHistory
} from 'react-router-dom'

const Config = ({ component: Component, currentState, ...rest }) => {
    const [ReducerData, setReducerData] = useState({})
    const history = useHistory()
    const msgObj = { message: 'You need to create an user to use our chat', success: false }

    useEffect(() => {
        async function solveState() {
            const response = await currentState
            setReducerData(response)
        }
        solveState()
    }, [currentState])

    const currentStateValidator = ReducerData.message === null || ReducerData.error || ReducerData.action === 'delete'
    console.log(ReducerData)
    return (
        <Route {...rest} render={props => (
            currentStateValidator ? 
            (
                history.push('/user', msgObj)
            ) : (
                <Component {...props} />
            )
        )}/>
    )
}

const Config2 = ({ component: Component, currentState, ...rest }) => {
    const history = useHistory()
    const [reducerData, setReducerData] = useState({})

    useEffect(() => {
        async function solveState() {
            const response = await currentState
            setReducerData(response)
        }
        solveState()
    }, [currentState])

    const validator = reducerData.name === undefined && reducerData.action === 'add'
    return (
        <Route {...rest} render={props => (
            validator ? (
                <Component {...props} />
            ) : (
                history.push('/chat', {
                    success: false,
                    message: 'You need to log out to register an user'
                })
            )
        )} />
    )
}

export const LoginRoute = connect(state => ({ currentState: state.userReducer }))(Config2)
export const ChatRoute = connect(state => ({ currentState: state.userReducer }))(Config)

export const NotFound = () => {
    const history = useHistory()
    return <Route path="*" component={() => (
        <>
        <h1>Route not found</h1>
        <button onClick={() => history.push('/')} className="btn btn-success">Go to home</button>
        </>
    )}/>
}