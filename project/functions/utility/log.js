exports.messageJSON = (msg) => {
    return { message: msg };
};

exports.errorJSON = (msg) => {
    console.error(`ERROR: ${msg}`);
    return messageJSON(msg);
};
