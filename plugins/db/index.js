import DatabaseManager from './src/Manager/DatabaseManager';
import config from '../../knexfile';

export default new DatabaseManager('development', config);