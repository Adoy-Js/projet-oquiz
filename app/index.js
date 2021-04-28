const dotenv = require('dotenv');
dotenv.config();

const Tag = require('./models/Tag');

// Solution model
Tag.findAll((err, tags) => {
  console.log("findAll Callback", {err, tags})
});