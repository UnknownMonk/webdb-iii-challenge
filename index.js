const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cohortsRouts = require('./cohorts/cohortsRoutes');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true // needed for sqlite
};
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/cohorts', cohortsRouts);

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Yeah Boi!! Server ${port} is running`));
