import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withLastLocation } from 'react-router-last-location';
import { useHistory } from 'react-router-dom'

import Card from './user-components/card'
import { PUT } from '../services/fetch'
import { key } from '../json/key'

export const User = ({ dispatch, lastLocation }) => {
    const [ inptValue, setInptValue ] = useState('');
    const [ repos, setRepos ] = useState([]);
    const storage = JSON.parse(localStorage.getItem(key))

    const history = useHistory();
    useEffect(() => {
        if(!lastLocation && !storage.name) {
            localStorage.setItem(key, JSON.stringify({}))
        }
    }, [lastLocation, storage])

    useEffect(() => {
        async function responseData(){
            const response = await axios.get('https://api.github.com/users/leanonybr-7579/repos')

            setRepos([ ...response.data ])
        }
        responseData()
    }, [])

    function handleButtonClick() {
        PUT('/user', { name: inptValue })(dispatch)
        history.push('/chat', true)
    }

    return (
        <>
            <div className="container error">
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
