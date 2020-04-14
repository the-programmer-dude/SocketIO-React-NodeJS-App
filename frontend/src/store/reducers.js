import { combineReducers } from 'redux'
import { key } from '../json/key.json'

import * as errors from './actions'

var INITIAL_STATE = {
    message: null,
    error: false
}

function userReducer(before = INITIAL_STATE, data) {
    if(!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify({}))
    }
    const { type } = data

    if(type === errors.ADD_PLAYER_CHAT) {
        if(data.playername) {
            localStorage.setItem(key, JSON.stringify({ name: data.playername, error: false, status: 'logged' }))
            return {
                error: false,
                alert: 'logged'
            }
        }
    }else if(type === errors.REMOVE_PLAYER_FROM_CHAT) {
        localStorage.setItem(key, JSON.stringify({ message: 'Logged out', error: false, status: 'logged-out' }))
        return {
            error: false,
            alert: 'deleted'
        }
    }else if(type === errors.CONFLICT_409) {
        localStorage.setItem(key, JSON.stringify({ message: 'Someone is using the same name on our room', error: true, status: null }))
        return { 
            error: true,
            alert: '409'
        }
    }else if(type === errors.NOT_FOUND_404) {
        localStorage.setItem(key, JSON.stringify({ message: 'User not found', error: true, status: null }))
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