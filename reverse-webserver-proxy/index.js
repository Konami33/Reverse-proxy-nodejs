const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer().on("error", (e) => {
    console.log(e);
});;


//docker server 1
app.use('/origin1', (req, res) => {
    console.log("proxying GET request", req.originalUrl);
    proxy.web(req, res, { target: 'http://host.docker.internal:8081', ws: true  });
});


//docker server 2
app.use('/origin2', (req, res) => {
  proxy.web(req, res, { target: 'http://host.docker.internal:8082', ws: true  });
});

//error
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.status(500).send('Proxy error');
});

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Reverse proxy server running on port ${PORT}`);
});
