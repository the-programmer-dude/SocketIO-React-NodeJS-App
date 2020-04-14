import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withLastLocation } from 'react-router-last-location'
import { useHistory } from 'react-router-dom'

import Card from './user-components/card'
import { key } from '../json/key'
import { PUT } from '../services/fetch'

export const User = ({ dispatch, lastLocation }) => {
    const [ inptValue, setInptValue ] = useState('');
    const [ repos, setRepos ] = useState([]);
    const [logged, setLoggedState] = useState(false)
    const [ localErrors, setErrors ] = useState([])

    const history = useHistory()
    const storage = JSON.parse(localStorage.getItem(key))

    if(storage.status === 'logged') {
        history.push('/chat')
    }
    useEffect(() => {
        if(logged) {
            window.location.reload(true)
            history.push('/chat') 
        }
    }, [logged, history])

    useEffect(() => {
        if(!lastLocation && !storage.name) {
            localStorage.setItem(key, JSON.stringify({}))
        }
    }, [lastLocation, storage])

    useEffect(() => {
        axios.get('https://api.github.com/users/leanonybr-7579/repos')
        .then(res => {
            setRepos([...res.data])
        })
    }, [])

    function handleButtonClick(e) {
        e.preventDefault()

        const errors = []
        if(inptValue.length < 4) {
            errors.push("Your username is too small(min: 3)")
        }
        if(inptValue.length >= 20) {
            errors.push("Your username is too big(max: 20)")
        }
        if(inptValue.includes(' ')) {
            errors.push("You cannnot use blank spaces in your name")
        }

        if(errors.length === 0) {
            PUT('/user', {name: inptValue})(dispatch)
            setLoggedState(true)
            setErrors([]) 
        }else{
            setErrors(errors) 
        }
    }

    if(performance.navigation.type === 1) {
        if(storage.status === 'logged') {
            history.push('/chat')
        }
        if(storage.error) {
            localStorage.setItem(key, JSON.stringify({}))
        }
    }

    return (
        <>
            <div className="container error">
                {localErrors.map((error, index) => (
                    <div className="alert alert-danger" key={index}>{error}</div>
                ))}
                {!storage.error && storage.message !== undefined ? (
                    <div className="alert alert-success">{storage.message}</div>
                ) : (
                    <>
                        {storage.error && storage.message !== undefined ? (
                            <div className="alert alert-danger">{storage.message}</div>
                        ) : null}
                    </>
                )}
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

export default connect()(ELEMENT)
