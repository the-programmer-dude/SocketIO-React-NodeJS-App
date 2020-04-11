import React from 'react'
import {
    Route,
    useHistory
} from 'react-router-dom'
import { key } from '../json/key.json'
import { stat } from 'fs'

export const ChatRoute = ({ component: Component, location,...rest }) => {
    const { state } = location
    const ReducerData = JSON.parse(localStorage.getItem(key))
    const history = useHistory()

    console.log(state !== true)
    const currentStateValidator = ReducerData.status === 'logged-out' && state !== true
    return (
        <Route {...rest} render={props => (
            currentStateValidator ? (
                history.push('/user')
            ) : ( 
                <Component {...props} /> 
            )
        )}/>
    )
}

export const LoginRoute = ({ component: Component, ...rest }) => {
    const history = useHistory()
    const reducerData = JSON.parse(localStorage.getItem(key))

    const validator = reducerData.name !== undefined && !reducerData.error
    return (
        <Route {...rest} render={props => (
            !validator ? (
                <Component {...props} />
            ) : (
                history.push('/chat')
            )
        )} />
    )
}

export const NotFound = () => {
    const history = useHistory()
    return <Route path="*" component={() => (
        <>
        <h1>Route not found</h1>
        <button onClick={() => history.push('/')} className="btn btn-success">Go to home</button>
        </>
    )}/>
}