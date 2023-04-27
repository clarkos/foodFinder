require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_URL
} = process.env;

let setSSL = false;
console.log('el entorno es ', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  setSSL = true;
}
console.log('el SSL es ', setSSL)

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: setSSL
  },
  pool: {
    acquire: 30000, 
    idle: 10000, 
    min: 0, 
    max: 10 
  },
  logging: false
});

const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Recipe, Diet } = sequelize.models;
Recipe.belongsToMany(Diet, {through: "recipe-diet"});
Diet.belongsToMany(Recipe, {through: "recipe-diet"})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  sequelize,     // para importart la conexión { conn } = require('./db.js');
};
