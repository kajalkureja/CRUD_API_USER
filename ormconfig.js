// ormconfig.js
module.exports = {
    type: 'postgres', // or 'mysql', 'sqlite', etc.
    host: 'localhost',
    port: 5432,         // or the port your database uses
    username: 'postgres',
    password: '2320',
    database: 'mydb',
    synchronize: true,  // set to true only in development, for auto-creating tables
  };
  