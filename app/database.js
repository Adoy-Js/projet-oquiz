const { Client } = require('pg');

const PGURL = process.env.PG_URL;
const client = new Client(PGURL);

client.connect();

module.exports = client;