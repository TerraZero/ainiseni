import RouteBuilder from '../Builder/RouteBuilder';

export default class RouterManager {

  constructor() {
    this._routes = [];
    this._controller = null;
    this._namespace = '';
  }

  /** @returns {RouteBuilder[]} */
  get routes() {
    return this._routes;
  }

  /**
   * @param {import('../Base/ControllerBase').default} controller
   */
  addController(controller) {
    this._controller = controller;
    controller.routes(this);
    this._controller = null;
  }

  /**
   * @param {string} namespace 
   * 
   * @returns {this}
   */
  namespace(namespace) {
    this._namespace = namespace;
    return this;
  }

  /**
   * @param {string} name 
   * @param {string} pattern 
   * @param {function} serve
   * 
   * @returns {RouteBuilder}
   */
  create(name, pattern, serve) {
    const builder = new RouteBuilder(name, '/' + this._namespace + pattern, serve.bind(this._controller), this._controller.id);
    this.routes.push(builder);
    return builder;
  }

  /**
   * @param {import('../Base/ControllerBase').default} controller 
   * @returns {RouteBuilder[]}
   */
  controllerRoutes(controller) {
    const routes = [];

    for (const route of this.routes) {
      if (route.controller === controller.id) {
        routes.push(route);
      }
    }
    return routes;
  }

}