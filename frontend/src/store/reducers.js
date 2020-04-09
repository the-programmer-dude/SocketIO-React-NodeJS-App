import { combineReducers } from 'redux'
import { api } from '../services/api'
import { connectToServer } from '../services/socket'
import { key } from '../json/key.json'

import { 
    ADD_PLAYER_CHAT,
    REMOVE_PLAYER_FROM_CHAT
} from './actions'

var INITIAL_STATE = {
    message: null,
    error: false
}

function userReducer(before = INITIAL_STATE, data) {
    const { type } = data
    console.log(data.response)
    if(type === ADD_PLAYER_CHAT) {
        localStorage.setItem(key, JSON.stringify(data.response))
        return data.response
    }else if(type === REMOVE_PLAYER_FROM_CHAT) {
        localStorage.setItem(key, JSON.stringify(INITIAL_STATE))
        return data.response;
    }
    return before
}

export default combineReducers({
    userReducer
})