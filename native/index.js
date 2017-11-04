import Http from '../client/Http';
import LoginService from '../client/login';
import TokenService from './Token';

const http = new Http(TokenService);

export {http};
export {LoginService};
export {TokenService};
