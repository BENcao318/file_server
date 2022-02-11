const { fstat } = require('fs');
const net = require('net');
const fs = require('fs');

const conn = net.createConnection({
  host: 'localhost',
  port: 3000,
});

conn.on('connect', () => {
  conn.write('./server_file/test.txt');
})

conn.on('data', (data) => {
  if(data === null) {
    console.log('Error from retriving file from server!')
  } else {
    // console.log(data);
    fs.writeFile('./client_file/test.txt', data, 
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    }, 
    (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        console.log(fs.readFileSync("./client_file/test.txt", "utf8"));
      }
    })
  }
})

  