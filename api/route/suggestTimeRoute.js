const express = require('express');
const route = express.Router();
const suggestTimeService = require('../service/suggestTimeService');

route.post('/suggest-times', (req, res) => {

    //passes the entire request to service file.
    const response = suggestTimeService(req);
    return res.status(200).json({message: "Here are the Suggested time slots", suggestions: response});
});

module.exports = route;