const userStorage = require('./storage/user');
const sessionStorage = require('./storage/session');

const register = function(params) {
    const promise = new Promise(function(resolve, reject) {
        return userStorage.create(params)
            .then(createdUser => {
                return sessionStorage.create(createdUser.username);
            })
            .then(createdSession => {
                resolve({
                    username: createdSession.username,
                    cookie: createdSession.session,
                    cookieExpirationTime: createdSession.expireTime
                });
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const login = function(params) {
    const promise = new Promise((resolve, reject) => {
        return userStorage.fetch()
            .then(users => {
                const userToLogin = users.find(user => user.username === params.username && user.password === params.password);
                if (userToLogin) {
                    return sessionStorage.create(params.username);
                } else {
                    reject({type: 'auth.invalidCredentials', message: 'Invalid credentials'});
                }
            })
            .then(createdSession => {
                resolve({
                    username: createdSession.username,
                    cookie: createdSession.session,
                    cookieExpirationTime: createdSession.expireTime
                });
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const logout = function(sessionId) {
    return sessionStorage.deleteSession(sessionId);
};

const getUsernameByCookie = function(cookie) {
    let promise = new Promise((resolve, reject) => {
        return sessionStorage.fetch()
            .then(sessions => {
                var currentSession = sessions.find(session => session.session === cookie);
                if (currentSession) {
                    resolve(currentSession.username);
                    return;
                }
                resolve();
            });
    });

    return promise;
};

const validateSession = function(cookie) {
    const promise = new Promise((resolve, reject) => {
        return sessionStorage.fetch()
            .then(sessions => {
                const errorSessionObj = {type: 'auth.invalidSession', message: 'Invalid Session'}; 

                var currentSession = sessions.find(session => session.session === cookie);
                if (currentSession) {
                    let now = Date.now();
                    let cookieExpireTime = new Date(currentSession.expireTime).getTime();
                    return now > cookieExpireTime ? reject(errorSessionObj) : resolve(currentSession);
                } else {
                    reject(errorSessionObj);
                }
            });
    });

    return promise;
};

module.exports = {
    register,
    login,
    logout,
    validateSession,
    getUsernameByCookie
};
