const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const DB = require('./database.js');

const authCookieName ='token';

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());


// Serve up the application's static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user'});
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);
        setAuthCookie(res, user.token);
        res.send({
            id: user._id,
        })
    }
})

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized '});
})

//Delete Auth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
})

//Get User retruns information about a user
apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
        const token = req?.cookies.token;
        res.send({ email: user.email, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ msg: 'UNKNOWN' })
})

apiRouter.get('/auth/getAll', (req, res) => {
    console.log("I'm here");
    const allPeoples = DB.returnAllUsers();
    allPeoples.forEach(element => {
        console.log(element);
    });
})


var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);


secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

//Submit response
secureApiRouter.post('/response', async (req, res) => {
    await DB.addResponse(req.body);
    const responses = await DB.returnResponses();
    res.send(responses);
})

//Get reponses
secureApiRouter.get('/responses', async (_req, res) => {
    const responses = await DB.returnResponses();
    res.send(responses);
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
})


let responses = [];
function updateResponses(newResponse, responses) {
    responses.push(newResponse);
    return responses;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }


//Listen should always be last (can't listen for the things that are below this! MAS IMPORTANTE)
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})