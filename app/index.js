const dotenv = require('dotenv');
dotenv.config();

const dataMapper = require('./dataMapper');

// Solution datamapper
dataMapper.getAllLevels((err, levels) => {
  console.log("getAllLevels Callback", {err, levels})
});
// Solution datamapper
dataMapper.getOneLevel(1123123, (err, level) => {
  console.log("getOneLevel Callback", {err, level})
});