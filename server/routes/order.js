const { authenticationData, orderData } = require('../data');
const helper = require('./helper');

const defaultPageSize = 20;

const add = {
    method: 'POST',
    path: '/api/orders',
    handler: function(request, reply) {
        return orderData.create(request.payload)
        .then(orderResult => {
            return reply(orderResult);
        })
        .catch(error => {
            return reply({
                error: {
                    type: error.type || 'unknown',
                    message: `Error - ${error.message}`
                }
            });
        });
    }
};

const fetch = {
    method: 'GET',
    path: '/api/orders',
    handler: function(request, reply) {
        const cookie = helper.getCookie(request.headers);
        return authenticationData.validateSession(cookie)
            .then(sessionObj => {
                return orderData.fetch(sessionObj.username);
            })
            .then(orders => {
                let lengthToLoop = defaultPageSize > orders.length ? orders.length : defaultPageSize;
                let startIndex = 0;
                let queryPage = parseInt(request.query.page);
                if (queryPage) {
                    startIndex = queryPage - 1;
                }
                let ordersToReturn = [];
                for (var i = startIndex * lengthToLoop; i < (startIndex + 1) * lengthToLoop; i += 1) {
                    if (orders[i]) {
                        ordersToReturn.push(orders[i]);
                    }
                }
                return reply(ordersToReturn);
            })
            .catch(error => {
                return reply({
                    error: {
                        type: error.type || 'unknown',
                        message: `Error - ${error.message}`
                    }
                });
            });
    }
};

const get = {
    method: 'GET',
    path: '/api/orders/{id}',
    handler: function(request, reply) {
        const cookie = helper.getCookie(request.headers);
        return authenticationData.validateSession(cookie)
            .then(sessionObj => {
                return orderData.getById(parseInt(request.params.id), sessionObj.username);
            })
            .then(order => {
                return reply(order);
            })
            .catch(error => {
                return reply({
                    error: {
                        type: error.type || 'unknown',
                        message: `Error - ${error.message}`
                    }
                });
            });
    }
};

module.exports = {
    add,
    fetch,
    get
};
