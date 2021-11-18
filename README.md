# Stateful authentication with json web token
Build Authentication system(RestApi) using express js, mongodb and redis
 ## Project Structure 
┌ `src`\
├─ `api` \
├── `components` \
├─── `auth` \
├──── `controller.js` \
├──── `model.js` \
├──── `route.js` \
├──── `service.js` \
├── `middlewares` \
├─── `auth_middleware.js` \
├── `app.js` \
├── `routes.js` \
├─ `config` \
├── `logger.js` \
├─ `helpers` \
├── `db_helper.js` \
├── `jwt_helper.js` \
├── `redis_helper.js` \
├─ `server.js` \
└ `.eslintrc.json`
## Usage 
These instructions will get you a copy of the project up and running on your local machine

### Requirement 
- [nodejs](https://nodejs.org/en/)
- [mongodb](https://www.mongodb.com/)
- [redis](https://redis.io/)
- [express](https://expressjs.com/)
## How To Use
From your command line, first clone the repository into your local machine:

```bash
# Clone this repository
$ git clone https://github.com/MezianeKhalil/NodeJwtAuth.git
# Then go into the repository
$ cd NodeJwtAuth
# Then remove current remote repository
$ git remote remove origin
```
Install the dependencies:
```bash
# Install with NPM
$ npm install
```
Specify your target port:
``` bash
# In the .env file
port = 3000
DB_URI = 'mongodb://localhost:27017/NodeJWTAuth'
ACCESS_TOKEN_SECRET = 'your key'
REFRESH_TOKEN_SECRET = 'your key'
REDIS_HOST = 6379
REDIS_PORT = '127.0.0.1'
```
Lastly launch the Project:
```bash
# Launch with NPM
$ npm run dev
```
