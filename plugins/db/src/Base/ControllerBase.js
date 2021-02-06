export default class ControllerBase {

  /**
   * @param {import('../Manager/DatabaseManager').default} manager
   */
  constructor(manager) {
    this._manager = manager;
    this._bag = null;
  }

  /** @returns {import('../Manager/DatabaseManager').default} */
  get manager() {
    return this._manager;
  }

  /** @returns {import('knex')} */
  get connection() {
    return this.manager.connection;
  }

  /** @returns {object} */
  get bag() {
    if (this._bag === null) throw new Error('Call not in request context');
    return this._bag;
  }

  /** @returns {string} */
  get id() {
    throw new Error('Not implemented');
  }

  /**
   * @param {import('~/api/Serve').default} serve 
   * @param {Error} error 
   * 
   * @returns {import('~/api/Serve').default}
   */
  async onError(serve, error) {
    return serve.reject(error);
  }

  /** @param {import('../Manager/RouterManager').default} router */
  routes(router) {}

  /**
   * @param {import('../Builder/RouteBuilder').default} route 
   * @param {import('~/api/Serve').default} serve 
   * @param {object} bag 
   */
  async routing(route, serve, bag) {
    try {
      this._bag = bag;
      const respone = await route.serve(serve, bag);
      this._bag = null;
      return respone;
    } catch (e) {
      this._bag = null;
      return (await this.onError(serve, e)).send();
    }
  }

}