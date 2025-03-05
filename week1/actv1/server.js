// function greet(name) {
//     console.log('hello ' + name)
// }

// greet('Eliezio')

// console.log(module);

// const logger = require('./logger');


// logger.log('message');



// const logger = require('./logger');

// logger.log('Hello everyone');
// console.log(logger.url); 

// const path = require('path');

// const pathObj = path.parse(__filename);

// console.log(pathObj)

// const os = require('os')
// const totalMemory = os.totalmem();
// const freeMem = os.freemem();


// console.log(`total mem: ${totalMemory}\ntotal FREE: ${freeMem}`)

// const fs = require('fs');

// fs.readdir

// const EventEmitter = require('events');




// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged', (arg) => {
//     console.log('Listener called', arg);
// });

// logger.log('')


// const http = require('http');
// const server = http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write(req.url);
//     res.end();
// });


// // const { Socket } = require('dgram');
// // const http = require('http');

// // const server = http.createServer((req, res) => {
// //     if (req.url === '/') {
// //         res.write(' hello visitor')
// //         res.end();
// //     }

// // });



// server.listen(3000);

// console.log('port 3000 is listening')


// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello Eliezio');
//     res.end();
// });

// const port = 3000;

// app.listen(process.env.port || port);
// console.log('Web Server is listening at port ' + (process.env.PORT || port));


// mongodb+srv://<>@cluster0.fjv4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongosh "mongodb+srv://elieziopingo1989::amor1103@cluster0.fjv4e.mongodb.net/?retryWrites=true&w=majority"


// mongodb+srv://elieziopingo1989:<amor1103>@cluster0.fjv4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



// mongodb+srv://root:<root>@cluster0.fjv4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado ao MongoDB!'))
    .catch(err => console.error('❌ Erro na conexão:', err));













