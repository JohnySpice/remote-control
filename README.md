# RSSchool NodeJS websocket task
> Static http server and websocket server.

## Installation
1. Clone/download repo
2. `npm install`

## Usage
### Set Port:
  >rename .env-example to .env that use port parametr from it or it will be default port 8080

**Development**

`npm run start:dev`

* App served @ `http://localhost:8080` & @ `ws://localhost:8080` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8080` & @ `ws://localhost:8080` without nodemon

**If you use port other than 8080, you'll be need connect to ws server by used port from interfase**

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.