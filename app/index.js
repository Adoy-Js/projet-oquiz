const dotenv = require('dotenv');
dotenv.config();

const dataMapper = require('./dataMapper');

// Solution datamapper
dataMapper.getAllLevels((err, levels) => {
  console.log("getAllLevels Callback", {err, levels})
});