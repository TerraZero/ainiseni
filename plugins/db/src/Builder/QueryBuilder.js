import QueryCondition from './QueryCondition';

export default class QueryBuilder {

  /**
   * @param {import('../Manager/DatabaseManager').default} manager
   * @param {import('../Schema/Schema').default} schema 
   */
  constructor(manager, schema) {
    this.manager = manager;
    this.type = type;
    this.schema = schema;
    this.query = this.manager.connection(this.schema.table);
  }

  as(key, alias) {
    const value = {};

    value[alias] = key;
    return value;
  }

  /**
   * @param {string} key 
   * 
   * @returns {string}
   */
  wire(key) {
    const spread = key.split('.');
    let schema = this.schema;
    let target = this.schema.table;

    for (const field of spread) {
      const newSchema = schema.get(field);
      if (newSchema === null) break;
      this.wireJoin()
    }
    return target;
  }

  wireJoin(from, to, field, foreign) {
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
    const target = this.wire(key);
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