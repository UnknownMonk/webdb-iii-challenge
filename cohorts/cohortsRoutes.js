const coRouter = require('express').Router();
const knex = require('knex');
const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
};

const db = knex(knexConfig);

coRouter.get('/', async (req, res) => {
  try {
    const roles = await db('cohorts');
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json(error);
  }
});

coRouter.get('/:id', async (req, res) => {
  // get the roles from the database
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

coRouter.get('/:id/students', async (req, res) => {
  try {
    const student = await db('students')
      .where({ cohort_id: req.params.id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(student);
  }
});

coRouter.post('/', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);

    const role = await db('cohorts')
      .where({ id })
      .first();

    res.status(201).json(role);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

coRouter.put('/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const role = await db('cohorts')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

coRouter.delete('/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});
module.exports = coRouter;
