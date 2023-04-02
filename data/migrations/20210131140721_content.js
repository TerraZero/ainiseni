/**
 * @param {import('knex')} knex 
 */
exports.up = function(knex) {
  return knex.schema.createTable('content', table => {
    table.increments();

    table.text('type').notNullable();
    table.text('title').notNullable();
    table.integer('uid').unsigned();

    table.foreign('uid').references('id').inTable('user').onDelete('CASCADE');
  });
};

/**
 * @param {import('knex')} knex 
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('content');
};

/**
 * query.condition('text', 'hallo')
 * query.condition('entity.id', 'hallo')
 * query.condition('entity.text', 'hallo')
 */