import * as fetchData from '../services/fetch'
import { api } from '../services/api'

export const ADD_PLAYER_CHAT = 'ADD_PLAYER_TO_CHAT'
export const REMOVE_PLAYER_FROM_CHAT = 'REMOVE_PLAYER_FROM_CHAT'

export function addPlayerToChat(playername) {
    async function responseData() {
        const response = await fetchData.PUT(api, '/user', { name: playername })
        return response
    }
    return {
        type: ADD_PLAYER_CHAT,
        response: responseData()
    }
}

export function logOut(playername) {
    const response = fetchData.DELETE(api, '/user', playername)
    return {
        type: REMOVE_PLAYER_FROM_CHAT,
        response
    }
}