import ControllerBase from "./ControllerBase";
const Querystring = require('querystring');

export default class ContentControllerBase extends ControllerBase {

  /** @returns {string} */
  get table() {
    return this.id;
  }

  /** @returns {import('../Builder/QueryBuilder').default} */
  getQuery() {
    return this.manager.getQuery(this.table);
  }

  /** @param {import('../Manager/RouterManager').default} router */
  routes(router) {
    router.namespace(this.table);
    router.create('schema', '/schema', this.serveSchema).checkGET();
    router.create('search', '/search?*query', this.serveSearch).checkGET();
    router.create('insert', '/insert', this.serveInsert).checkPOST();
    router.create('delete', '/delete/:id', this.serveDelete).checkGET().checkField({id: (id) => !isNaN(id) });
    router.create('view', '/:id', this.serveData).checkGET().checkField({id: (id) => !isNaN(id) });
    router.create('list', '', this.serveData).checkGET();
  }

  async insert(values) {
    const ids = await this.getQuery().insert(values).execute();

    return ids[0];
  }

  async delete(id) {
    return await this.getQuery().where('id', id).delete().execute();
  }

  async update(id, values) {
    return await this.query.where('id', id).update(values);
  }

  /**
   * @param {import('~/api/Serve').default} serve 
   * @param {object} bag
   */
  async serveSearch(serve, bag) {
    const filters = Querystring.parse(bag.query);
    const query = this.getQuery().select(this.table);
    for (const filter in filters) {
      await query.condition(filter, filters[filter]);
    }
    return serve.json(await query.execute()).send();
  }

  /**
   * @param {import('~/api/Serve').default} serve 
   * @param {object} bag
   */
  async serveData(serve, bag) {
    if (bag.id) {
      return serve.json(await this.getQuery().select(this.table).where('id', bag.id).execute()).send();
    }
    return serve.json(await this.getQuery().select(this.table).execute()).send();
  }

  /**
   * @param {import('~/api/Serve').default} serve 
   * @param {object} bag
   */
  async serveSchema(serve, bag) {
    return serve.json(await this.manager.schema(this.table)).send();
  }

  /**
   * @param {import('~/api/Serve').default} serve 
   * @param {object} bag
   */
  async serveInsert(serve, bag) {
    const values = (await serve.getJSON()).values;
    const id = await this.insert(values);
    return serve.json(id).send();
  }

  /**
   * @param {import('~/api/Serve').default} serve 
   * @param {object} bag
   */
  async serveDelete(serve, bag) {
    await this.delete(bag.id);
    return serve.meta('status', 200).send();
  }

}