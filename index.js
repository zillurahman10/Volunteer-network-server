const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// user : Volunteer-network
// pass : kw21wFDk6N4IslD2

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fh6ya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const db = client.db("Volunteer").collection("services")

        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = db.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })
    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Volunteers are working!')
})

app.listen(port, (req, res) => {
    console.log('Port is running', port);
})