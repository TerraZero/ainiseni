import ControllerBase from "../Base/ControllerBase";

export default class SchemaController extends ControllerBase {

  /** @returns {string} */
  get id() {
    return 'schema';
  }

  /** @param {import('../Manager/RouterManager').default} router */
  routes(router) {
    router.namespace('schema');
    router.create('add', '/add', this.serveAdd).checkPOST();
  }

  /**
   * @param {import('~/api/Serve').default} serve 
   * @param {object} bag
   */
  async serveAdd(serve, bag) {
    const data = await serve.getJSON();
    console.log(data);
    
    const config = this.manager.config.get('schema.' + data.from);
    const fields = config.get('fields') || [];

    for (const field of fields) {
      if (field.key === data.field.key) throw new Error('Field key "' + field.key + '" already in use.');
    }
    fields.push(data.field);
    config.set('fields', fields);
    config.save();
    return serve.json(data).send();
  }

}