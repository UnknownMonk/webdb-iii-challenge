exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
    tbl.increments();
    tbl
      .string('name', 128)
      .notNullable()
      .unique();
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('cohorts');
};
