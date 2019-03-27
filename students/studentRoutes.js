const studentRouter = require('express').Router();
const knex = require('knex');
const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
};

const db = knex(knexConfig);

studentRouter.get('/', async (req, res) => {
  try {
    const students = await db('students');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

studentRouter.get('/:id', async (req, res) => {
  // get the students from the database
  try {
    const cohort = await db('students')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// coRouter.get('/:id/students', async (req, res) => {
//   try {
//     const student = await db('students')
//       .where({ cohort_id: req.params.id })
//       .first();
//     res.status(200).json(student);
//   } catch (error) {
//     res.status(500).json(student);
//   }
// });

studentRouter.post('/', async (req, res) => {
  try {
    const [id] = await db('students').insert(req.body);

    const student = await db('students')
      .where({ id })
      .first();

    res.status(201).json(student);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

studentRouter.put('/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const student = await db('students')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

studentRouter.delete('/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});
module.exports = studentRouter;
