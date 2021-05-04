const dotenv = require('dotenv');
const express = require('express')
const session = require('express-session')
dotenv.config();
const router = require('./router');

const app = express()

const port = process.env.PORT || 3000

// On défini qu'on utilise le moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// On dit à express comment décoder le POST
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

// Décodage des sessions
app.use(session({
  secret: 'monsupermotdepasse',
  resave: true,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.locals.userConnected = req.session.userConnected || null;
  if (res.locals.userConnected){
    delete res.locals.userConnected.password;
  }
  next();
})
// Ajout du router
app.use(router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})