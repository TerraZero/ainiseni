import QueryCondition from './QueryCondition';

export default class QueryBuilder {

  /**
   * @param {import('../Manager/DatabaseManager').default} manager
   * @param {string} type 
   */
  constructor(manager, type) {
    this.manager = manager;
    this.table = table;
    this.query = this.manager.connection(table);
    this.joins = {};
  }

  as(key, alias) {
    const value = {};

    value[alias] = key;
    return value;
  }

  /**
   * @param {string} target 
   */
  wire(target) {

  }

  join(from, to, field, foreign) {
    const as = [from, field, to, foreign].join('_');
    if (this.joins[as] === undefined) {
      this.joins[as] = as;
      this.query.join(this.as(to, as), from + '.' + field, '=', as + '.' + foreign);
    }
    return this.joins[as];
  }

  /**
   * @param {string} select 
   * 
   * @returns {this}
   */
  select(select) {
    if (select.indexOf('.') === -1) {
      select += '.*';
    }
    this.query.select(select);
    return this;
  }

  /**
   * @param {string} key 
   * @param {*} value 
   * @param {string} operator 
   * 
   * @returns {this}
   */
  where(key, value, operator = '=') {
    this.query.where(key, operator, value);
    return this;
  }

  /**
   * @param {string} key 
   * @param {*} value 
   * @param {string} operator 
   * 
   * @returns {this}
   */
  async condition(key, value, operator = '=') {
    const condition = new QueryCondition(this, key, value);
    let definition = null;
    let table = this.table;

    while (definition = await condition.next()) {
      switch (definition.op) {
        case 'where':
          this.query.where(table + '.' + definition.field, operator, value);
          break;
        case 'join':
        case 'foreign join':
          table = this.join(table, definition.table, definition.field, definition.foreign);
          break;
      }
    }
    return this;
  }

  /**
   * @param {*} values 
   * 
   * @returns {this}
   */
  insert(values) {
    this.query.insert(values);
    return this;
  }

  /**
   * @returns {this}
   */
  delete() {
    this.query.del();
    return this;
  }

  /**
   * @returns {import('knex')}
   */
  execute() {
    return this.query;
  }

}