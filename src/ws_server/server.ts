import { AddressInfo, WebSocketServer } from 'ws';
import { handler } from './controllers';
import { Server } from 'http';

export function startServer(server: Server) {
  const wss = new WebSocketServer({
    server,
  });
  console.log();
  wss.on('connection', ws => {
    ws.on('message', async message => {
      console.log(message.toString());
      const [command] = message.toString().split(' ');
      const result = await handler(message);
      ws.send(`${command} ${result ?? ''}`);

    });
  });
  console.log(`WS server started on the ${(wss.address() as AddressInfo).port} port`);
  return wss;
};