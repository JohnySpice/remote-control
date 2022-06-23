import { httpServer } from './src/http_server/index';
import { startServer } from './src/ws_server/server';
import 'dotenv/config';

const PORT = process.env.PORT || 8080;

console.log(`Start static http server on the ${PORT} port!`);

httpServer.listen(PORT);
const wss = startServer(httpServer);

process.on('exit', () => {
  console.log('terminate all client connection');
  for (const client of wss.clients) {
    client.close();
  }
});

process.on('SIGINT', () => {
  process.exit();
});