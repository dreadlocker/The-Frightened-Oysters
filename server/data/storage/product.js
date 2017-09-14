const fs = require('fs');
const path = require('path');
const config = require('../../config');
const helper = require('./helper');
const userStorage = require('./user');

const getProductsFilePath = () => {
    const appDir = path.dirname(require.main.filename);
    return path.join(appDir, config.fileStorage.products);
};

const productsFilePath = getProductsFilePath();

const fetch = function() {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(productsFilePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            let products = helper.decrypt(data);
            products = products.sort((a, b) => a.id < b.id);
            resolve(products);
        });
    });

    return promise;
};

const create = function(params) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(products => {
                let newProductId = 1;
                const lastAddedProduct = products[0];
                if (lastAddedProduct) {
                    newProductId = lastAddedProduct.id + 1;
                }
                params.id = newProductId;
                params.dateAdded = new Date();
                products.push(params);

                const dataToWrite = helper.encrypt(products);
                fs.writeFile(productsFilePath, dataToWrite, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(params);
                });
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const getById = function(id) {
    let productInfo;
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(products => {
                let product = products.find(p => p.id === id);

                if (product) {
                    productInfo = product;
                    return userStorage.get(product.ownerUsername);
                } else {
                    resolve(product);
                }
            })
            .then(productOwnerInfo => {
                resolve(Object.assign(productInfo, { ownerInfo: productOwnerInfo }));
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const edit = function(id, loggedUsername, productInfo) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(products => {
                products = products.map(product => {
                    if (product.id === id && product.ownerUsername === loggedUsername) {
                        product.name = productInfo.name;
                        product.description = productInfo.description;
                        product.price = productInfo.price;
                        product.brand = productInfo.brand;
                        product.model = productInfo.model;
                        product.year = productInfo.year;
                        product.os = productInfo.os;
                        product.color = productInfo.color;
                        product.size = productInfo.size;
                        product.resolution = productInfo.resolution;
                        product.camera = productInfo.camera;
                        product.battery = productInfo.battery;
                        product.processor = productInfo.processor;
                        product.memory = productInfo.memory;
                        product.storage = productInfo.storage;
                        product.imageUrl = productInfo.imageUrl;
                    }

                    return product;
                });

                const dataToWrite = helper.encrypt(products);
                fs.writeFile(productsFilePath, dataToWrite, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(productInfo);
                });
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const deleteProduct = function(id, loggedUsername) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(products => {
                products = products.filter(product => !(product.id === id && product.ownerUsername === loggedUsername));

                const dataToWrite = helper.encrypt(products);
                fs.writeFile(productsFilePath, dataToWrite, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({success: true});
                });
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const deleteProductsByIds = function(ids) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(products => {
                products = products.filter(product => ids.indexOf(product.id) < 0);

                const dataToWrite = helper.encrypt(products);
                fs.writeFile(productsFilePath, dataToWrite, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({success: true});
                });
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

module.exports = {
    fetch,
    create,
    getById,
    edit,
    delete: deleteProduct,
    deleteProductsByIds
};
