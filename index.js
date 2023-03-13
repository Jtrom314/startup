const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the application's static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Submit response
apiRouter.post('/response', async (req, res) => {
    await DB.addResponse(req.body);
    const responses = await DB.returnResponses();
    res.send(responses);
})

//Get reponses
apiRouter.get('/responses', async (_req, res) => {
    const responses = await DB.returnResponses();
    res.send(responses);
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

let responses = [];
function updateResponses(newResponse, responses) {
    responses.push(newResponse);
    return responses;
}
