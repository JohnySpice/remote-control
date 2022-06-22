import { httpServer } from './src/http_server/index';
import { startServer } from './src/ws_server/server';
import 'dotenv/config';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

console.log(`Start static http server on the ${PORT} port!`);
httpServer.listen(PORT);
startServer(httpServer);