import { api } from './api'
import { addPlayerToChat, logOut, error409, error404 } from '../store/actions'

export function PUT(route, data) {
    return async dispatch => {
        try {
            const json = await api.put(route, data)
            const { name } = json.data
            
            if (json.data.status === 200) {
                dispatch(addPlayerToChat(name))
            }else if (json.data.status === 409) {
                dispatch(error409(name))
            }
        }
        catch (err) {
            console.error(err)
        }
    }
}

export function DELETE(route, param) {
    return async dispatch => {
        try {
            const json = await api.delete(`${route}/${param}`)
            const { name } = json.data
            if (json.status === 404) {
                dispatch(error404(name))
            }else if (json.status === 200) {
                dispatch(logOut(name))
            }
        }
        catch (err) {
            return console.error(err)
        }
    }
}