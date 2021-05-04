const dotenv = require('dotenv');
const express = require('express')
dotenv.config();
const router = require('./router');

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));

// Ajout du router
app.use(router)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})