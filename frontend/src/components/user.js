import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withLastLocation } from 'react-router-last-location';

import Card from './user-components/card'
import { addPlayerToChat } from '../store/actions'

export const User = ({ currentState, location, dispatch, lastLocation }) => {
    const [state, setState] = useState(location.state)
    const [ reducerData, setReducerData ] = useState(currentState)
    const [ inptValue, setInptValue ] = useState('')
    const [ repos, setRepos ] = useState([])

    const itemsRef = useRef()

    useEffect(() => {
        if(state && !lastLocation) {
            setState({
                success: false,
                message: ''
            })
            location.state = undefined
        }
    }, [lastLocation, state, location.state ])

    useEffect(() => {
        async function solve() {
            const resp = await currentState
            setReducerData(resp)
        }
        solve()
    }, [currentState])

    useEffect(() => {
        async function responseData(){
            const response = await axios.get('https://api.github.com/users/leanonybr-7579/repos')

            setRepos([ ...response.data ])
        }
        responseData()
    }, [])

    function handleButtonClick() {
        dispatch(addPlayerToChat(inptValue))
        
    }
    
    setTimeout(() => {
        if(itemsRef.current) {
            const e = itemsRef.current
            let child = e.lastElementChild
            while(child) {
                e.remove(child)
                child = e.lastElementChild
            }
        }
    }, 2000);

    return (
        <>
            <div className="container" ref={itemsRef}>
            { state && state.message !== '' ? (
                <>
                    { !state.success ? (
                        <div className="alert alert-danger">{state.message}</div>
                    ) : (
                        <div className="alert alert-success">{state.message}</div>
                    ) }
                </>
            ) : null }   

                { reducerData.error ? (
                    <div className="alert alert-danger">{reducerData.message}</div>
                ) : null }
            </div>

            <div className="card p-3 mt-2">
                <input type="text" value={inptValue} onChange={e => setInptValue(e.target.value)}/>
                <button className="btn btn-success mt-4" onClick={handleButtonClick}>Register</button>
            </div>
            
            <div className="row row-cols-1 row-cols-md-2 card-body w-100 container row d-flex justify-content-center">
                {repos.map(elements => (
                    <Card element={elements} key={ (Math.random() * 1000) * 1000 + Date.now().toString }/>
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
