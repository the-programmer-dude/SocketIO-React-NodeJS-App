import { combineReducers } from 'redux'
import { key } from '../json/key.json'

import * as errors from './actions'

var INITIAL_STATE = {
    message: null,
    error: false
}

function userReducer(before = INITIAL_STATE, data) {
    const { type } = data
    console.log(data)
    if(type === errors.ADD_PLAYER_CHAT) {
        localStorage.setItem(key, JSON.stringify({ name: data.playername, error: false }))
        return {
            error: false,
            alert: 'logged'
        }
    }else if(type === errors.REMOVE_PLAYER_FROM_CHAT) {
        localStorage.setItem(key, JSON.stringify({ message: 'Logged out', error: false }))
        return {
            error: false,
            alert: 'deleted'
        }
    }else if(type === errors.CONFLICT_409) {
        localStorage.setItem(key, JSON.stringify({ message: 'Someone is using the same name on our room', error: true }))
        return { 
            error: true,
            alert: '409'
        }
    }else if(type === errors.NOT_FOUND_404) {
        localStorage.setItem(key, JSON.stringify({ message: 'User not found', error: true }))
        return {
            error: true,
            alert: '404'
        }
    }
    
    return before
}

export default combineReducers({
    userReducer
})