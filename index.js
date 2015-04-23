let http = require('http')
let fs = require('fs')
let request = require('request')
let through = require('through')

let clc = require('cli-color');
  let error = clc.red.bold;
  let responseCli = clc.green.bold;
  let proxyCli = clc.green.bold;
  let notice = clc.blue.bold;

let argv = require('yargs')
  .default('host', '127.0.0.1')
  .help('h')
  .alias('h', 'help')
  .describe('host', 'Proxy to a remote machine')
  .describe('port', 'Remote machine port')
  .describe('url', 'Remote machine URL')
  .describe('log', 'Name of logfile to write logs to')
  .usage('Usage: bode $0 <command> [options]')
  .example('bode $0 --host www.google.com')
  .example('bode $0 --url http://google.com')
  .example('bode $0 --log /tmp/proxy.log')
  .epilog('Thanks to CodePath and @WalmartLabs for Node.JS!')
  .argv

let scheme = 'http://'
let port = argv.port || argv.host === '127.0.0.1' ? 8000 : 80
let destinationUrl = argv.url || scheme + argv.host + ':' + port
let logStream = argv.log ? fs.createWriteStream(argv.log) : process.stdout

http.createServer((req, res) => {
  logStream.write(responseCli('\nEcho request: \n' + JSON.stringify(req.headers)))
  for (let header in req.headers) {
    res.setHeader(header, req.headers[header])
  }
  through(req, logStream, {autoDestroy: false})
  req.pipe(res)
}).listen(8000)

logStream.write(notice('Listening at http://127.0.0.1:8000'))

http.createServer((req, res) => {
  let url = destinationUrl
  if (req.headers['x-destination-url']) {
    url = req.headers['x-destination-url']
  }
  let options = {
    headers: req.headers,
    url: url + req.url
  }

  logStream.write(responseCli('\nProxy Request: \n' + JSON.stringify(req.headers)))
  through(req, logStream, {autoDestroy: false})

  let destinationResponse = req.pipe(request(options))

  logStream.write(JSON.stringify(destinationResponse.headers))
  destinationResponse.pipe(res)
  through(destinationResponse, logStream, {autoDestroy: false})
}).listen(8001)
