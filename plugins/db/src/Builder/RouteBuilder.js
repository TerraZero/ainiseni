/**
 * @callback checkCallback
 * @param {import('~/api/Serve').default} serve
 * @param {object} bag
 */

 /**
 * @callback checkFieldCallback
 * @param {*} field
 * @param {import('~/api/Serve').default} serve
 * @param {object} bag
 */

import Route from 'route-parser';

export default class RouteBuilder {

  /**
   * @param {string} name
   * @param {string} pattern 
   * @param {function} serve 
   * @param {string} controller
   */
  constructor(name, pattern, serve, controller) {
    this.name = name;
    this.pattern = pattern;
    this.serve = serve;
    this.route = new Route(pattern);
    this.controller = controller;
    this._checks = [];
  }

  get meta() {
    return {
      controller: {
        id: this.controller,
        serve: this.serve.name,
      },
      route: {
        name: this.name,
        pattern: this.pattern,
      },
    };
  }

  /**
   * @param {import('../Base/ControllerBase').default} controller 
   * @param {import('~/api/Serve').default} serve 
   * @param {object} bag 
   */
  testCheck(controller, serve, bag) {
    for (const check of this._checks) {
      if (check.call(controller, serve, bag) === false) return false;
    }
    return true;
  }

  /** 
   * @param {string} url 
   * 
   * @returns {(null|object)}
   */
  match(url) {
    return this.route.match(url);
  }

  /**
   * @param {checkCallback} cb 
   */
  check(cb) {
    this._checks.push(cb);
    return this;
  }

  checkGET() {
    return this.check((serve) => {
      return serve.isGET();
    });
  }

  checkPOST() {
    return this.check((serve) => {
      return serve.isPOST();
    });
  }

  /**
   * @param {string[]} fields 
   */
  checkRequired(fields) {
    return this.check((serve, bag) => {
      for (const field of fields) {
        if (typeof bag[field] === undefined || typeof bag[field] === null) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * @param {Object.<string, checkFieldCallback>} fields
   */
  checkField(fields) {
    return this.check(function(serve, bag) {
      for (const field in fields) {
        if (typeof bag[field] !== undefined && !fields[field].call(this, bag[field], serve, bag)) {
          return false;
        }
      }
      return true;
    });
  }

}