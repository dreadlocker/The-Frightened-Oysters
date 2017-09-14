'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const data = require('./data');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 9090
});

// Register routes
routes.forEach(route => {
    let routeWithCors = Object.assign(
        route,
        {   
            config: {
                cors: {
                    origin: ['*'],
                    // headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                    // headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type"],
                    additionalHeaders: ['cache-control', 'x-cookie', "Access-Control-Allow-Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"]
                }
            }
        }
    );
    server.route(route);
});

data.start();

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
