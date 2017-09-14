const fs = require('fs');
const path = require('path');
const config = require('../config');

const authenticationData = require('./authentication');
const profileData = require('./profile');
const productData = require('./product');
const orderData = require('./order');

const start = () => {
    // Create data files if not exists

    let fileStorageConf = config.fileStorage;
    if (fileStorageConf) {
        for (let property in fileStorageConf) {
            let currentPath = fileStorageConf[property];

            const appDir = path.dirname(require.main.filename);
            let pathToCheck = path.join(appDir, currentPath);

            fs.access(pathToCheck, (err) => {
                if (err) {
                    fs.writeFile(pathToCheck, '', (err) => {
                        if (err) throw err;
                    });
                }
            });
        }
    }
};

module.exports = {
    start,
    authenticationData,
    profileData,
    productData,
    orderData
};
