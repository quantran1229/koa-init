'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
import {
  cfg
} from '../config'
import {
  getLogger
} from '../services/logger';

const logger = getLogger('DATABASE');


const db = {};

let sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_POST,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    useUTC: false, //for reading from database
  },
  timezone: cfg('DB_TIMEZONE', String), //for writing to database
  logging: cfg('DB_LOGGING', String) ? logger.sql : false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(function (err) {
    logger.sql('Connection has been established successfully.');
  })
  .catch(function (err) {
    logger.error('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;