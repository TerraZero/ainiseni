import Serve from '../Serve';
import DB from '../../plugins/db';

/**
 * @param {import('http').ClientRequest} req
 * @param {import('http').ServerResponse} res 
 * @param {*} next 
 */
export default function (request, response, next) {
  DB.routing(new Serve(request, response));
}