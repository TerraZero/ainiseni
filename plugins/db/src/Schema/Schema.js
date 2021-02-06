export default class Schema {

  /**
   * @param {import('../Manager/DatabaseManager').default} manager
   * @param {string} table 
   */
  constructor(manager, table) {
    this.manager = manager;
    this._table = table;
    this._schema = null;
    this._fields = null;
    this._final = null;
  }

  get schema() {
    if (this._schema === null) {
      return this.manager.connection('sqlite_master').where('type', 'table').where('name', this._table).then((schema) => {
        if (schema[0] === undefined) throw Error('SCHEMA_ERROR: no such table: ' + this._table);
        this._schema = schema[0];
        return this._schema;
      });
    } else {
      return Promise.resolve(this._schema);
    }
  }

  async getFields() {
    if (this._fields === null) {
      this._fields = {};
      const schema = await this.schema;

      for (const string of schema.sql.match(/^[^(]*\((.*)\)[^)]*$/)[1].split(',')) {
        const name = string.match(/^[^`]*`([^`]*)`.*$/)[1];

        if (string.indexOf('foreign key') !== -1) {
          const match = string.match(/^.*references `([^`]*)`\(`([^`]*)`.*$/);

          this._fields[name].foreign = {
            table: match[1],
            field: match[2],
          };
        } else {
          this._fields[name] = {
            name: string.match(/^[^`]*`([^`]*)`.*$/)[1],
            type: string.trim().split(' ')[1],
            notNull: string.indexOf('not null') !== -1,
            primary: string.indexOf('primary key') !== -1,
            autoincrement: string.indexOf('autoincrement') !== -1,
            foreign: false,
          };
        }
      }
    }
    return this._fields;
  }

  async getSchema() {
    if (this._final === null) {
      this._final = {
        meta: {
          table: this._table,
          controller: this.manager.controller(this._table).id,
        },
        fields: await this.getFields(),
        routes: {},
      };
      for (const route of this.manager.router.controllerRoutes(this.manager.controller(this._table))) {
        this._final.routes[route.name] = route.pattern;
      }
    }
    return this._final;
  }

}