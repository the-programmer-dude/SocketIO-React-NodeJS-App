const express = require('express')
const user = require('../json/users.json')
const Router = express.Router()

Router.put('/user', (req, res) => {
    const { name } = req.body
    let foundedOne = false

    user.users.map(person => {
        if(person.name === name) {
            foundedOne = true
        }
    })

    if(!foundedOne) {
        user.users.push({
            name
        })
    }else{
        return res.json({ message: 'Someone is using the same name(409 conflict)', status: 409, error: true, action: 'none' })
    }

    return res.json({ status: 200 ,name, error: false, action: 'add' })
})

Router.delete('/user/:name', (req, res) => {
    const { name } = req.params

    const index = user.users.indexOf({ name })
    user.users.splice(index, 1)
    if(!user.users[index] || user.users[index].name !== name) {
        return res.json({ status: 404, message: "This user don't exist", error: true, action: 'none' })
    }

    return res.json({ status: 200, message: 'Sucessfully deleted your user', error: false, action: 'delete' })
})

module.exports = Router