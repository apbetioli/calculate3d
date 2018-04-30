const express = require('express');
const port = process.env.PORT || 5000;

express()
    .use(express.static(__dirname + '/public'))
    .listen(port);
