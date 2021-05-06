import * as net from 'net';
import * as fs from 'fs';

/**
 * Servidor que recibe los mensajes de los clientes y los almacena en database/history.txt
 * Para ejecutar dicho código, debemos abrir una terminal y colocar: node dist/client.js Mensaje
 * Donde va el Mensaje, debemos colocar el mensaje a enviar, por ejemplo: node dist/client.js Estoy en clase
 */
const server = net.createServer({allowHalfOpen: true}, (connection) => {
  console.log('\nClient connected.');

  let data = '';
  connection.on('data', (dataChunk) => {
    data += dataChunk;
  });

  connection.on('end', () => {
    console.log('Client\'s request has been received.');

    const request = JSON.parse(data);

    fs.appendFile('database/history.txt', request.text + '\n', (err) => {
      if (err) {
        connection.write(JSON.stringify({'type': 'error'}), (err) => {
          if (err) console.log(`Request could not be made: ${err.message}.`);
          else connection.end();
        });
      } else {
        connection.write(JSON.stringify({'type': 'success'}), (err) => {
          if (err) console.log(`Request could not be made: ${err.message}.`);
          else connection.end();
        });
      }
    });
  });

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
