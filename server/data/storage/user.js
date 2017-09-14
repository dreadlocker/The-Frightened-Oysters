const fs = require('fs');
const path = require('path');
const config = require('../../config');
const helper = require('./helper');

const getUserFilePath = () => {
    const appDir = path.dirname(require.main.filename);
    return path.join(appDir, config.fileStorage.users);
};

const userFilePath = getUserFilePath();

const fetch = function() {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(userFilePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const users = helper.decrypt(data);
            resolve(users);
        });
    });

    return promise;
};

const create = function(params) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(users => {
                let newUserId = 1;
                const lastUser = users[users.length - 1];
                if (lastUser) {
                    newUserId = lastUser.id + 1;
                }
                params.id = newUserId;
                users.push(params);

                const dataToWrite = helper.encrypt(users);
                fs.writeFile(userFilePath, dataToWrite, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({
                        username: params.username
                    });
                });
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const edit = function(params) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(users => {
                users = users.map(user => {
                    if (user.username === params.username) {
                        user.password = params.password;
                        user.company = params.company;
                        user.phone = params.phone;
                        user.address = params.address;
                        user.email = params.email;
                        user.avatarUrl = params.avatarUrl;
                    }

                    return user;
                });

                const dataToWrite = helper.encrypt(users);
                fs.writeFile(userFilePath, dataToWrite, (err) => {
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

const get = function(username) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(userFilePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const users = helper.decrypt(data);
            const user = users.find(u => u.username === username);
            resolve(user);
        });
    });

    return promise;
};

module.exports = {
    create,
    fetch,
    edit,
    get
};
