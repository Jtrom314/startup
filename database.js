const { MongoClient } = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured you dumb dumb. Check your code!');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}.yrwizyx.mongodb.net/bnb`;
console.log(url);

const client = new MongoClient(url);
const responseCollection = client.db('startup').collection('responses');

function addResponse(response) {
    responseCollection.insertOne(response);
}

function returnResponses() {
    const query = {};
    const options = {};
    const all = responseCollection.find(query, options);
    return all.toArray();
}

module.exports = { addResponse, returnResponses };