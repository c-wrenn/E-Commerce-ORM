const express = require('express');
const routes = require('./routes');


// import sequelize connection
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3308;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
//force:true to restart drop/recreate table(s) on every sync
// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => 
//   console.log(`App listening on port ${PORT}!`));
  
// });
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});