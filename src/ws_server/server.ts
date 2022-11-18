import { AddressInfo, createWebSocketStream, WebSocketServer } from 'ws';
import { handler } from './router';
import { Server } from 'http';

export function startServer(server: Server) {
  const wss = new WebSocketServer({
    server,
  });
  wss.on('connection', ws => {
    const stream = createWebSocketStream(ws, { decodeStrings: false });
    stream.on('readable', async () => {
      const buffer: any = [];
      let data;
      while ((data = stream.read())) {
        buffer.push(data);
      }
      const message = buffer.join('');
      const result = await handler(message);
      console.log(message.toString());
      const [command] = message.toString().split(' ');
      stream.write(`${command} ${result ?? ''}`);
    });
    stream.on('error', e => {
      console.log(`Error has occured: ${e}`);
    });
  });
  console.log(`WS server started on the ${(wss.address() as AddressInfo).port} port`);
  return wss;
};