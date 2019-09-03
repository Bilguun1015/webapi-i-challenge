// implement your API here
const express = require('express');

const Hubs = require('./data/db.js')

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    Hubs.find().then(users => {
        
        res.status(200).json(users);
    }).catch(error => {
        res.status(500).json({message : 'error getting the list of users'})
    })
})

server.get('/api/users/:id', (req, res) => {

    Hubs.find().then(hubs => {
        
        res.status(200).json(hubs);
    }).catch(error => {
        res.status(500).json({message : 'error getting the user'})
    })
})

server.post('/api/users', (req, res) => {
    const userInformation = req.body
    Hubs.insert(userInformation)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(error => {
        res.status(500).json({message: 'error adding the hub'})
    })
})

server.delete('/hubs/:id',(req, res) => {
    const hubId = req.params.id;
    Hubs.remove(hubId)
    .then(deleted => {
        if(deleted){
            res.status(200).json({message: "susseffully removed"})
        } else {
            res.status(404).json({message: "hub not found"})
        }
    })
    .catch(error => {
        res.status(500).json({message: 'error removing the hub'})
    })
})

server.put('/hubs/:id', (req, res) =>{
    const { id } = req.params;

    const changes = req.body;

    Hubs.update(id, changes).then(updated => {
        if(updated){
            res.status(200).json(updated)
        } else {
            res.status(404).json({message: "hub not found"})
        }
    }).catch(error => res.status(500).json({message: "error updating hub"}))
})

const port = 8000;
server.listen(port, () => console.log('api running'));