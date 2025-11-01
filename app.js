const express =  require('express');
const app = express();
const conflictRoute = require('./api/route/conflictRoute')
const suggestTimeRoute = require('./api/route/suggestTimeRoute')
app.use(express.json());

app.use('/api', conflictRoute);
app.use('/api', suggestTimeRoute);

const port = 3000;
app.listen(port, () => console.log(`Api running on Port ${port}`));

module.exports = app;