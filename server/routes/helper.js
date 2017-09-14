const getCookie = (requestHeader) => {
    return requestHeader['x-cookie'];
};

module.exports = {
    getCookie
};
