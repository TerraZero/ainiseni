export default class Schema {

  /**
   * @param {import('../Manager/DatabaseManager').default} manager 
   * @param {string} type
   * @param {import('../Base/Config').default} config 
   */
  constructor(manager, config) {
    this.manager = manager;
    this.key = type;
    this.config = config;
  }

  get type() {
    return this.config.get('type');
  }

  get fields() {
    return this.config.get('fields');
  }

  get table() {
    return this.config.get('table');
  }

  get(key) {
    if (this.fields[key] === undefined) {
      return null;
    } else {
      return this.manager.schema('field.' + this.fields[key].type);
    }
  }

}