# node-proxy-server
A proxy server developed using Node.JS

####Overview:
The proxy server will open up 2 ports on your machine: port 8000 and port 8001.

`Port 8000:` Echo Server on this port will simple echo our requests back to caller

`Port 8001:` Proxy Server that will route the request to the intended destination and will return response back to the caller

```
Usage: bode index.js <command> [options]

Options:
  -h, --help  Show help                                                         
  --host      Proxy to a remote machine                   [default: "127.0.0.1"]
  --port      Remote machine port                                               
  --url       Remote machine URL                                                
  --logfile   Name of logfile to write logs to                                  

Examples:
  bode index.js --host www.google.com                                           
  bode index.js --url http://google.com                                         
  bode index.js --logfile /tmp/proxy.log                                        

Thanks to CodePath and @WalmartLabs for Node.JS!
```

####Codepath Task List:
- [x] Can you successfully echo requests made to the echo server?




- [x] Can you successfully proxy requests made to the proxy server?
- [x] Did you include a CLI as described above?
- [x] Does your app log request to stdout or save it properly to a file when the log argument is given?
- [x] Did you successfully push your code to github? Can you see the code on github?
