import Http from '../client/http';
import LoginService from '../client/login';
import TokenService from './token';

const http = new Http(TokenService);

export {http};
export {LoginService};
export {TokenService};
