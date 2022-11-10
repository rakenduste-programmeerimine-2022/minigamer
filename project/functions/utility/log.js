class Message {
    text = "";
    error = false;

    constructor(msg, err) {
        this.text = msg;
        this.error = err;
    }

    addObject(obj) {
        this.object = obj;
    }
}

exports.log = (text, obj = {}) => {
    const message = new Message(text, false);
    if (Object.keys(obj).length != 0) {
        message.addObject(obj);
    }
    return message;
};

exports.logError = (text, toConsole = false) => {
    if (toConsole) {
        console.error(text);
    }
    return new Message(text, true);
};
