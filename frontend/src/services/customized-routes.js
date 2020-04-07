import React from 'react'
import {
    Route,
    useHistory
} from 'react-router-dom'
import { key } from '../json/key.json'

export const ChatRoute = ({ component: Component, location,...rest }) => {
    const ReducerData = JSON.parse(localStorage.getItem(key))
    const history = useHistory()
    const msgObj = { message: 'You need to create an user to use our chat', success: false }
    console.log(location)

    const currentStateValidator = ReducerData.message === null || ReducerData.error && ReducerData.action === 'delete' 
    const currentStateValidator2 = ReducerData.action === 'delete' && ReducerData.status === 200 && !ReducerData.error
    const msgObj2 = { message: ReducerData.message, success: true }
    return (
        <Route {...rest} render={props => (
            currentStateValidator ? 
            (
                history.push('/user', msgObj)
            ) : (
                currentStateValidator2 ? (
                    history.push('/user', msgObj2)
                ) : (
                    <Component {...props} />
                )
            )
        )}/>
    )
}

export const LoginRoute = ({ component: Component, ...rest }) => {
    const history = useHistory()
    const reducerData = JSON.parse(localStorage.getItem(key))

    const validator = reducerData.name !== undefined && reducerData.action === 'add' && reducerData.status === 200
    return (
        <Route {...rest} render={props => (
            !validator ? (
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

export const NotFound = () => {
    const history = useHistory()
    return <Route path="*" component={() => (
        <>
        <h1>Route not found</h1>
        <button onClick={() => history.push('/')} className="btn btn-success">Go to home</button>
        </>
    )}/>
}