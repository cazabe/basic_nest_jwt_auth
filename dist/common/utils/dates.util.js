"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayDate = void 0;
const getTodayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let hours = String(today.getHours()).padStart(2, "0");
    let minutes = String(today.getMinutes()).padStart(2, "0");
    let seconds = String(today.getSeconds()).padStart(2, "0");
    let todayString = String(today);
    todayString = yyyy + "-" + mm + "-" + dd;
    todayString += " " + hours + ":" + minutes + ":" + seconds;
    return todayString;
};
exports.getTodayDate = getTodayDate;
//# sourceMappingURL=dates.util.js.map