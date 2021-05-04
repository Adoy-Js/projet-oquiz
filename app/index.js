const dotenv = require('dotenv');
const express = require('express')
dotenv.config();
const router = require('./router');

const app = express()

const port = process.env.PORT || 3000

// On défini qu'on utilise le moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// Ajout du router
app.use(router)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})