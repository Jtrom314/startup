const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured you dumb dumb. Check your code!');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}.yrwizyx.mongodb.net/bnb`;


const client = new MongoClient(url);
const responseCollection = client.db('startup').collection('responses');
const userCollection = client.db('startup').collection('user');

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    }
    await userCollection.insertOne(user);
    return user;
}

function returnAllUsers() {
    const query = {};
    const options ={};
    const all = userCollection.find(query, options);
    return all.toArray();
}

function addResponse(response) {
    responseCollection.insertOne(response);
}

function returnResponses() {
    const query = {};
    const options = {};
    const all = responseCollection.find(query, options);
    return all.toArray();
}

module.exports = { 
    addResponse, 
    returnResponses,
    getUser,
    createUser,
    getUserByToken, 
    returnAllUsers
};