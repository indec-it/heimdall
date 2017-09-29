# Heimdall

## Instalation

    npm install @indec/heimdall

## Configuration

Add the following environment variables:
    
```bash
AUTH_ENDPOINT=http://localhost:5000
AUTH_CLIENT_ID=<your app client_id>
AUTH_CLIENT_SECRET=<your app secret>
GRANT_TYPE=client_credentials
```

## Example

### Login on client side

```js
import {LoginService} from '@indec/heimdall/client';

// ENDPOINT constant is your heimdall server. i.e: http://localhost:5000
const loginService = new LoginService(ENDPOINT);
const token = await loginService.login(username, password)
```

### Clean user session

```js
import {TokenService} from '@indec/heimdall/client';

TokenService.clear();
```


### Listing users
List your app's users on server side:

```js
const {UserService} = require('@indec/heimdall').services;
UserService.fetchAll.then(
    users => console.log(users)
).catch(
    err => console.error(err)
)
```
