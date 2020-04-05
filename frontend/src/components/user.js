import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import Card from './user-components/card'
import { addPlayerToChat } from '../store/actions'

export const User = ({ currentState, location, addPlayer }) => {
    let { state } = location    

    const [ reducerData, setReducerData ] = useState(currentState)
    const [ inptValue, setInptValue ] = useState('')
    const [ repos, setRepos ] = useState([])

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

    if(window.performance) {
        if(performance.navigation.type === 1) {
            state = undefined
        }
    }

    return (
        <>
            <>
                { state ? (
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
            </>

            <div className="card p-3 mt-2">
                <input type="text" value={inptValue} onChange={e => setInptValue(e.target.value)}/>
                <button className="btn btn-success mt-4" onClick={() => addPlayer(inptValue)}>Register</button>
            </div>
            
            <div className="row row-cols-1 row-cols-md-2 card-body w-100 container row d-flex justify-content-center">
                {repos.map(elements => (
                    <Card element={elements} key={ (Math.random() * 1000) * 1000 + Date.now().toString }/>
                ))}
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentState: state.userReducer
})

const mapDispatchToProps = dispatch => ({
    addPlayer: inptValue => dispatch(addPlayerToChat(inptValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
