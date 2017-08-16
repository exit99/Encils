import { request } from './rest';

const login = request('POST', '/auth/login/', 'auth_token', 'loginForm');
const register = request('POST', '/auth/register/', 'auth_token', 'registrationForm');
const getProfile = request('GET', '/auth/me/', 'profile');

export {
  login,
  register,
  getProfile
}
