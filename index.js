const express = require('express');
const app = express();

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the application's static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Submit response
apiRouter.post('/response', (req, res) => {
    responses = updateResponses(req.body, responses);
    res.send(responses);
})

//Get reponses
apiRouter.get('/responses', (_req, res) => {
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