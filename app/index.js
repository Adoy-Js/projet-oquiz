const dotenv = require('dotenv');
dotenv.config();

const Level = require('./models/Level');

Level.findBy({
  id: 3,
  name:"Expert"
}, (err, levels) => {
  if (err) {
    console.error('Error findBy Levels', err);
  }
  console.log('Levels : ', levels);
});

