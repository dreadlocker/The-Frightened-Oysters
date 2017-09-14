const { authenticationData, profileData } = require('../data');
const helper = require('./helper');

const get = {
    method: 'GET',
    path: '/api/profile',
    handler: function(request, reply) {
        const cookie = helper.getCookie(request.headers);
        return authenticationData.validateSession(cookie)
            .then(sessionObj => {
                return profileData.get(sessionObj.username);
            })
            .then(userInfo => {
                return reply(userInfo);
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

const edit = {
    method: 'PUT',
    path: '/api/profile',
    handler: function(request, reply) {
        const cookie = helper.getCookie(request.headers);
        return authenticationData.validateSession(cookie)
            .then(sessionObj => {
                var userToEdit = Object.assign(request.payload, {username: sessionObj.username});
                return profileData.edit(userToEdit);
            })
            .then(userInfo => {
                return reply(userInfo);
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
    get,
    edit
};
