import * as net from 'net';

/**
 * Cliente que envía mensajes al servidor
 * Para ejecutar dicho código, debemos abrir una terminal y colocar: node dist/server.js
 */
if (process.argv.length < 3) {
  console.log('Error: You must specify at least one message.');
} else {
  const client = net.connect({port: 60300});

  let message: string = '';
  message = process.argv.splice(2).join(' ');

  client.write(JSON.stringify({'type': 'message', 'text': message}), (err) => {
    if (err) console.log(`Request could not be made: ${err.message}.`);
    else client.end();
  });

  let data = '';
  client.on('data', (dataChunk) => {
    data += dataChunk;
  });

  client.on('end', () => {
    const request = JSON.parse(data);
    if (request.type == 'success') console.log('The message could be added successfully.');
    else if (request.type == 'error') console.log('Error: The message could not be added to the history.');
  });

  client.on('error', (err) => {
    console.log(`Error: Connection could not be established: ${err.message}.`);
  });
}
