import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withLastLocation } from 'react-router-last-location';
import { useHistory } from 'react-router-dom'

import Card from './user-components/card'
import { addPlayerToChat } from '../store/actions'

export const User = ({ currentState, location, dispatch, lastLocation }) => {
    let { state } = location
    console.log(!lastLocation)

    const [ inptValue, setInptValue ] = useState('')
    const [ repos, setRepos ] = useState([])

    const history = useHistory()

    useEffect(() => {
        if(!lastLocation) {
            state = null
        }
    }, [state])

    useEffect(() => {
        async function responseData(){
            const response = await axios.get('https://api.github.com/users/leanonybr-7579/repos')

            setRepos([ ...response.data ])
        }
        responseData()
    }, [])

    function handleButtonClick() {
        dispatch(addPlayerToChat(inptValue))
        history.push('/chat')
    }

    return (
        <>
            <div className="container error">
                { state ? (
                    state.success ? (
                        <div className="alert alert-success">{state.message}</div>
                    ) : (
                        <div className="alert alert-danger">{state.message}</div>
                    )
                ) : null }
                { currentState.error ? (
                    <div className="alert alert-danger">{currentState.message}</div>
                ) : null }
            </div>

            <div className="card p-3 mt-2">
                <input type="text" value={inptValue} onChange={e => setInptValue(e.target.value)}/>
                <button className="btn btn-success mt-4" onClick={handleButtonClick}>Register</button>
            </div>
            
            <div className="row row-cols-1 row-cols-md-2 card-body w-100 container row d-flex justify-content-center">
                {repos.map((elements, index) => (
                    <Card element={elements} key={ index }/>
                ))}
            </div>
        </>
    )
}

const ELEMENT = withLastLocation(User)

const mapStateToProps = (state) => ({
    currentState: state.userReducer
})

export default connect(mapStateToProps)(ELEMENT)
