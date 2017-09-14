const decrypt = function(data) {
    // TODO: implement key logic here

    if (data.length === 0) {
        return [];
    } else {
        return JSON.parse(data);
    }
};

const encrypt = function(data) {
    return JSON.stringify(data);
};

module.exports = {
    decrypt,
    encrypt
};
