const { validationResult } = require("express-validator");
const { errorMessage } = require("../utility/message");

exports.validationCheck = (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length != 0) {
        let message = errors.reduce((total, current) => {
            return `${total}${current.msg}\n`;
        }, "");
        message = message.trim();
        return res.status(400).send(errorMessage(message));
    }
    next();
};
