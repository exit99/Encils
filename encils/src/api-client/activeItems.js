import { request } from './rest';

const getActiveItem = request('GET', `/active-item/`, 'activeItem');
const editActiveItem = request('PUT', `/active-item/`, 'activeItem');

export {
  getActiveItem,
  editActiveItem,
}
