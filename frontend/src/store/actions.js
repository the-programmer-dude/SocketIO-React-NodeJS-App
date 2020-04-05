export function addPlayerToChat(playername) {
    return {
        type: 'ADD_PLAYER_TO_CHAT',
        playername
    }
}

export function logOut(playername) {
    return {
        type: 'REMOVE_PLAYER_FROM_CHAT',
        playername
    }
}