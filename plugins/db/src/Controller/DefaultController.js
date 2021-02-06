import ContentControllerBase from "../Base/ContentControllerBase";

export default class DefaultController extends ContentControllerBase {

  /** @returns {string} */
  get id() {
    return 'default';
  }

  /** @returns {string} */
  get table() {
    if (this._bag === null) {
      return ':type';
    } else {
      return this.bag.type;
    }
  }

}