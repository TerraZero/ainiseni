import Path from 'path';
import FS from 'fs';
import Config from '../Base/Config';

export default class ConfigManager {

  /**
   * @param {import('./DatabaseManager').default} manager 
   */
  constructor(manager) {
    this.manager = manager;
    this.root = Path.normalize(Path.join(__dirname, '../../../../config/'));
    this._cache = {};
  }

  /**
   * @param {string} name 
   * 
   * @returns {string}
   */
  path(name) {
    return Path.join(this.root, name + '.json');
  }

  /**
   * @param {string} name 
   * 
   * @returns {Config}
   */
  get(name) {
    if (this._cache[name] === undefined) {
      this._cache[name] = new Config(this, name);
      this.load(name);
    }
    return this._cache[name];
  }

  /**
   * @param {string} name 
   */
  load(name) {
    const config = this.get(name);
    const path = this.path(name);

    if (FS.existsSync(path)) {
      config.setConfig(require(path));
    }
  }

  /**
   * @param {string} name 
   */
  save(name) {
    const config = this.get(name);
    const path = this.path(name);

    FS.writeFileSync(path, JSON.stringify(config.config, null, '  '));
    delete require.cache[require.resolve(this.path(name))];
  }

}