export default class StorageBase {

  /**
   * @param {import('../Manager/DatabaseManager').default} manager
   */
  constructor(manager) {
    this.manager = manager;
  }

  /**
   * @param {string} type 
   * @param {int} id
   */
  load(type, id) {

  }

  /**
   * @param {string} type 
   * @param {int} id 
   */
  createLoadQuery(type, id) {

  }

}