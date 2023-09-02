const mongoose = require('mongoose');
const { mongoUrl } = require('../config/config.json');

const options = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongooseObj = new mongoose.Mongoose();
// mongooseObj.set('debug', true);

const dbConnection = mongooseObj.createConnection(mongoUrl, options);

dbConnection.on('open', () => console.log(`Primary database connected. ${mongoUrl}`));
dbConnection.on('error', (e) => console.log(`Primary database error. ${e}`));

module.exports.dbConnection = dbConnection;
