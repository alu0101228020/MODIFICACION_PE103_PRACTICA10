import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import * as fs from 'fs';

describe('Testing server and client handlers', () => {
  let data: string = '';
  const server = new EventEmitter();
  const client = new EventEmitter();
  it('Can get a message', (done) => {
    client.on('data', (dataChunk) => {
      data += dataChunk;
      expect(data).to.be.eql({'type': 'message', 'text': 'Mensaje de prueba'});
    });
    server.emit('data', {'type': 'message', 'text': 'Mensaje de prueba'});
    done();
  });
});
