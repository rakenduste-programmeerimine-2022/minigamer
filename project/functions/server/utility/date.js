const { startOfDay } = require("date-fns");

exports.getStartOfToday = () => {
    return startOfDay(Date.now());
};
