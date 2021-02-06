export default class QueryCondition {

  /**
   * @param {import('./QueryBuilder').default} builder
   * @param {string} key 
   */
  constructor(builder, key) {
    this.builder = builder;
    this.original = key;
    this.key = key;
    this.table = builder.table;
  }

  get(seperator) {
    const split = this.key.split(seperator);
    const value = split.shift();

    this.key = split.join(seperator);
    return value;
  }

  async next() {
    if (this.key.length === 0) return false;
    let indexa = this.key.indexOf(':');
    let indexb = this.key.indexOf('.');

    indexa = indexa === -1 ? Infinity : indexa;
    indexb = indexb === -1 ? Infinity : indexb;
    if (indexa < indexb) {
      return {
        op: 'foreign join',
        field: this.get(':'),
        table: this.get('.'),
        foreign: this.get('.'),
      };
    } else if (indexb < indexa) {
      const schema = await this.builder.manager.schema(this.table);
      const join = {
        op: 'join',
        field: this.get('.'),
      };
      join.table = schema.fields[join.field].foreign.table;
      join.foreign = schema.fields[join.field].foreign.field;
      this.table = join.table;
      return join;
    } else {
      return {
        op: 'where',
        field: this.get('.'),
      };
    }
  }

}