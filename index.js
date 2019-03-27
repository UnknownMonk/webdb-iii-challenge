const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cohortsRouts = require('./cohorts/cohortsRoutes');
const studentRouts = require('./students/studentRoutes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/cohorts', cohortsRouts);
server.use('/api/students', studentRouts);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Yeah Boi!! Server ${port} is running`));
