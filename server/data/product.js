const productStorage = require('./storage/product');

const fetch = function(username) {
    return productStorage.fetch();
};

const create = function(params) {
    return productStorage.create(params);
};

const getById = function(id) {
    return productStorage.getById(id);
};

const edit = function(id, session, productInfo) {
    return productStorage.edit(id, session.username, productInfo)
};

const deleteProduct = function(id, session) {
    return productStorage.delete(id, session.username);
};

module.exports = {
    fetch,
    create,
    getById,
    edit,
    delete: deleteProduct
};
