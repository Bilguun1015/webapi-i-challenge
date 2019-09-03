// implement your API here
const express = require('express');

const Users = require('./data/db.js')

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    Users.find().then(users => {
        res.status(200).json(users);
    }).catch(error => {
        res.status(500).json({error : "The users information could not be retrieved."})
    })
})

server.get('/api/users/:id', (req, res) => {

    Users.find().then(users => {
        if(users){
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }).catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

server.post('/api/users', (req, res) => {
    const userInformation = req.body
    if(!userInformation.name || !userInformation.bio){
        res.status(400).json({message: "Please provide name and bio for the user"})
    } else {
        Users.insert(userInformation)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({error: 'There was an error while saving the user to the database.'})
        })
    }
})

server.delete('/api/users/:id',(req, res) => {
    const userID = req.params.id;
    Users.remove(userID)
    .then(deleted => {
        if(deleted){
            res.status(200).json({message: "user susseffully removed"})
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({error: 'The user could not be removed'})
    })
})

server.put('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    const changes = req.body;
    if(!changes.name || !changes.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else{
        Users
            .update(id, changes).then(updated => {
                if(updated){
                    res.status(200).json(updated)
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(error => res.status(500).json({message: "error updating user"}))
    }
})

const port = 8000;
server.listen(port, () => console.log('api running'));




