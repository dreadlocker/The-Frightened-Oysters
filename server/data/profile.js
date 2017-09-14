const userStorage = require('./storage/user');

const get = function(username) {
    const promise = new Promise((resolve, reject) => {
        return userStorage.fetch()
            .then(users => {
                let user = users.find(u => u.username === username);
                if (user) {
                    resolve(user);
                } else {
                    reject({type: 'user.noSuchUser', message: 'User not found'});
                }
            });
    });

    return promise;
};

const edit = function(params) {
    const promise = new Promise((resolve, reject) => {
        return userStorage.edit(params)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

module.exports = {
    get,
    edit
};
