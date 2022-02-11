const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('connection', (client) => {
  client.setEncoding('utf8');
  console.log('New client connected!');

  client.on('data', (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if(err) {
        console.log(err);
        client.write(null);
      } else {
        console.log(`client asking for transfer file from: ${path}`)
        client.write(data);
      }
    })
  })
})