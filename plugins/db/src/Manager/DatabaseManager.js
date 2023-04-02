import knex from 'knex';
import FS from  'fs';
import Path from 'path';
import RouterManager from './RouterManager';
import Schema from '../Schema/Schema';
import QueryBuilder from '../Builder/QueryBuilder';
import ConfigManager from './ConfigManager';

export default class DatabaseManager {

  /**
   * @param {string} env 
   * @param {object} config
   */
  constructor(env = 'development', config) {
    this._db = knex(config[env]);
    this._router = new RouterManager();
    this._schemas = {};
    this._controllers = this.controllers;
    this._config = new ConfigManager(this);
  }

  /** @returns {knex} */
  get connection() {
    return this._db;
  }

  /** @returns {ConfigManager} */
  get config() {
    return this._config;
  }

  /** @returns {RouterManager} */
  get router() {
    return this._router;
  }

  /** @returns {Object.<string, import('../Base/ControllerBase').default>} */
  get controllers() {
    if (this._controllers === undefined) {
      const controllers = {};
      const path = Path.normalize(Path.join(__dirname, '../Controller'));
      let fallback = null;

      for (const file of FS.readdirSync(path)) {
        const controller = new (require(Path.join(path, file)).default)(this);

        if (controller.id === 'default') {
          fallback = controller;
        } else {
          controllers[controller.id] = controller;
        } 
      }
      controllers.default = fallback;
      for (const controller in controllers) {
        this.router.addController(controllers[controller]);
      }
      return controllers;
    }
    return this._controllers;
  }

  /**
   * @param {string} table 
   * 
   * @returns {import('../Base/ControllerBase').default}
   */
  controller(table) {
    if (this.controllers[table] === undefined) {
      return this.controllers.default;
    } else {
      return this.controllers[table]; 
    }
  }

  /**
   * @param {import('~/api/Serve').default} serve
   */
  async routing(serve) {
    const url = serve.url();

    for (const route of this.router.routes) {
      const bag = route.match(url);
      const controller = this.controller(route.controller);

      if (bag && route.testCheck(controller, serve, bag)) {
        serve.meta('serve', route.meta);
        serve.meta('request', {url, bag});
        try {
          return await controller.routing(route, serve, bag);
        } catch (e) {
          return serve.reject(e).send();
        }
      }
    }
    return serve.errorNotFound().send();
  }

  /**
   * @param {string} type 
   * @param {string} name
   * 
   * @returns {import('../Schema/Schema').default}
   */
  schema(type) {
    if (this._schemas[type] === undefined) {
      this._schemas[type] = new Schema(this, type, this.config.get('schema.' + type));
    }
    this._schemas[type].config.cacheClear();
    return this._schemas[type];
  }

  /**
   * @param {string} type 
   * 
   * @returns {QueryBuilder}
   */
  getQuery(type) {
    return new QueryBuilder(this, this.schema(type));
  }

}