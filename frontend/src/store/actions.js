export const ADD_PLAYER_CHAT = 'ADD_PLAYER_TO_CHAT'
export const REMOVE_PLAYER_FROM_CHAT = 'REMOVE_PLAYER_FROM_CHAT'
export const CONFLICT_409 = 'CONFLICT_409'
export const NOT_FOUND_404 = 'NOT_FOUND_404'

export function addPlayerToChat(playername) {
    return {
        type: ADD_PLAYER_CHAT,
        playername
    }
}

export function logOut(playername) {
    return {
        type: REMOVE_PLAYER_FROM_CHAT,
        playername
    }
}

export function error409(playername) {
    return {
        type: CONFLICT_409,
        playername
    }
}

export function error404(playername) {
    return {
        type: NOT_FOUND_404,
        playername
    }
}