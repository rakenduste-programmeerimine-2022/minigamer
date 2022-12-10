class Response {
    status = 200;
    text = "";
    error = false;

    constructor(status, msg, err) {
        this.status = status;
        this.text = msg;
        this.error = err;
    }

    addObject(obj) {
        this.object = obj;
    }
}

exports.response = (status, text, obj = {}) => {
    const message = new Response(status, text, false);
    if (Object.keys(obj).length != 0) {
        message.addObject(obj);
    }
    return message;
};

exports.errorResponse = (status, text, toConsole = false) => {
    if (toConsole) {
        console.error(text);
    }
    return new Response(status, text, true);
};
