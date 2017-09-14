const { authenticationData } = require('../data');
const helper = require('./helper');

const login = {
    method: 'POST',
    path: '/api/auth/login',
    handler: function(request, reply) {
        return authenticationData.login(request.payload)
            .then(response => {
                return reply(response);
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

const register = {
    method: 'POST',
    path: '/api/auth/register',
    handler: function(request, reply) {
        return authenticationData.register(request.payload)
            .then(response => {
                return reply(response).state('x-cookie', response.cookie);
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

const logout = {
    method: 'GET',
    path: '/api/auth/logout',
    handler: function(request, reply) {
        const cookie = helper.getCookie(request.headers);

        return authenticationData.logout(cookie)
            .then(response => {
                return reply(response);
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
    login,
    register,
    logout
};
