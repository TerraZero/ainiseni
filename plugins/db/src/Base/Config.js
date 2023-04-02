export default class Config {

  /**
   * @param {import('../Manager/ConfigManager').default} manager 
   * @param {string} name 
   */
  constructor(manager, name) {
    this.manager = manager;
    this.name = name;
    this.config = {};
  }

  setConfig(config) {
    this.config = config;
  }

  load() {
    this.manager.load(this.name);
    return this;
  }

  save() {
    this.manager.save(this.name);
    return this;
  }

  get(name) {
    return this.config[name];
  }

  set(name, value) {
    this.config[name] = value;
    return this;
  }

  cacheClear() {
    this.manager.cacheClear(this.name);
    return this;
  }

}