const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const config = require('../../config');
const helper = require('./helper');

const getSessionFilePath = () => {
    const appDir = path.dirname(require.main.filename);
    return path.join(appDir, config.fileStorage.sessions);
};

const sessionFilePath = getSessionFilePath();

const fetch = function() {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(sessionFilePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const sessions = helper.decrypt(data);
            resolve(sessions);
        });
    });

    return promise;
};

const create = function(username) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(sessions => {
                // remove users session if already exists
                sessions = sessions.filter(session => session.username !== username);

                const expireTime = new Date();
                expireTime.setDate(expireTime.getDate() + 1);

                const newSession = {
                    username: username,
                    session: uuidv4(),
                    expireTime
                };
                sessions.push(newSession);

                const dataToWrite = helper.encrypt(sessions);
                fs.writeFile(sessionFilePath, dataToWrite, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(newSession);
                });
            })
            .catch(err => {
                reject(err);
            });
    });

    return promise;
};

const deleteSession = function(sessionId) {
    let promise = new Promise((resolve, reject) => {
        fetch()
            .then(sessions => {
                // remove users session if already exists
                sessions = sessions.filter(session => session.session !== sessionId);

                const dataToWrite = helper.encrypt(sessions);
                fs.writeFile(sessionFilePath, dataToWrite, (err) => {
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
}

module.exports = {
    create,
    fetch,
    deleteSession
};
