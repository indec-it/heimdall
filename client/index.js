import Http from './http';
import LoginService from './login';
import TokenService from './token';

const http = new Http(TokenService);

export {http};
export {LoginService};
export {TokenService};
