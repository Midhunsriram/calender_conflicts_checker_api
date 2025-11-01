const express = require('express');
const route = express.Router();
const conflictsCheckService = require('../service/conflictsCheckService');
route.post('/check-conflicts', (req, res) => {

    //fetches the details from request body
    const proposedEvent = req.body.proposedEvent;
    const existingEvents = req.body.existingEvents;
    const bufferTime = req.body.bufferTime? req.body.bufferTime : 15;

    //calls the conflictsCheckService file and passes the arguments for further processing.
    const response = conflictsCheckService(proposedEvent, existingEvents, bufferTime);

    //Response is a boolean.
    if (response){
        return res.status(200).json({message: "There is a Conflict between Proposed and Existing meeting"});
    } else {
        return res.status(200).json({message: "No Conflict, Meeting can be scheduled"});
    }
});

module.exports = route;