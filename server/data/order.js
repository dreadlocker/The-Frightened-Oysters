const oderStorage = require('./storage/order');

const create = function(params) {
    return oderStorage.create(params);
};

const fetch = function(username) {
    return oderStorage.fetchByUsername(username);
};

const getById = function(id, username) {
    return oderStorage.getById(id, username);
};

module.exports = {
    create,
    fetch,
    getById
};
