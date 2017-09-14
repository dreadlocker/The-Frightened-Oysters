const fs = require('fs');
const path = require('path');
const config = require('../../config');
const helper = require('./helper');
const productStorage = require('./product');

const getOrdersFilePath = () => {
    const appDir = path.dirname(require.main.filename);
    return path.join(appDir, config.fileStorage.orders);
};

const ordersFilePath = getOrdersFilePath();

const fetch = function() {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(ordersFilePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            let orders = helper.decrypt(data);
            orders = orders.sort((a, b) => a.id < b.id);
            resolve(orders);
        });
    });

    return promise;
};

const create = function(order) {
    let ordersCache;
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(orders => {
                ordersCache = orders;
                let newOrderId = 1;
                const lastAddedOrder = orders[0];
                if (lastAddedOrder) {
                    newOrderId = lastAddedOrder.id + 1;
                }
                order.id = newOrderId;
                order.dateCreated = new Date();

                return productStorage.fetch();
            })
            .then(products => {
                let orderProducts = products.filter(p => order.productIds.indexOf(p.id) >= 0);

                delete order.productIds;
                order.products = orderProducts;
                ordersCache.push(order);
                const dataToWrite = helper.encrypt(ordersCache);

                fs.writeFileSync(ordersFilePath, dataToWrite);
                let productIdsToBeDeleted = orderProducts.map(p => p.id);
                return productStorage.deleteProductsByIds(productIdsToBeDeleted);
            })
            .then(deleteProductsResult => {
                resolve(deleteProductsResult);
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const fetchByUsername = function(username) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(orders => {
                let userOrders = [];
                for (var i = 0; i < orders.length; i += 1) {
                    let currentOrder = orders[i];

                    const productsObj = getOrderProductsObjectByUsername(currentOrder, username);
                    if (productsObj.products.length > 0) {
                        let userOrder = parseUserOrder(currentOrder, productsObj);
                        userOrders.push(userOrder);
                    }
                }

                resolve(userOrders);
            });
    });

    return promise;
};

const getById = function(id, username) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(orders => {
                let order = orders.find(o => o.id === id);
                let userOrder;

                const productsObj = getOrderProductsObjectByUsername(order, username);
                if (productsObj.products.length > 0) {
                    userOrder = parseUserOrder(order, productsObj);
                }

                resolve(userOrder);
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const getOrderProductsObjectByUsername = (order, username) => {
    // Check if order has at least one product that belongs to the user
    let products = [];
    let orderPrice = 0;

    for (let i = 0; i < order.products.length; i += 1) {
        let currentProduct = order.products[i];
        if (currentProduct.ownerUsername === username) {
            delete currentProduct.id;
            products.push(currentProduct);
            orderPrice += currentProduct.price;
        }
    }

    return {
        products,
        orderPrice
    };
};

const parseUserOrder = (order, productObj) => {
    return {
        id: order.id,
        price: productObj.orderPrice,
        address: order.address,
        email: order.email,
        name: order.name,
        payment: order.payment,
        phone: order.phone,
        dateCreated: order.dateCreated,
        products: productObj.products
    };
};

module.exports = {
    create,
    fetchByUsername,
    getById
};
