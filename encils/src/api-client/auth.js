import { request } from './rest';

const login = request('POST', '/auth/login/', 'token', 'loginForm');

export {
  login,
}
