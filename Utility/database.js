// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node',
//     password: 'Sea_Flux'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'Sea_Flux' , {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
