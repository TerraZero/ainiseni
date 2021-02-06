/**
 * @param {import('knex')} knex 
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', table => {
    table.increments();

    table.text('name').unique().notNullable();
    table.text('pass').notNullable();
  });
};

/**
 * @param {import('knex')} knex 
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};
