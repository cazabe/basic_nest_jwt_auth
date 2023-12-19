"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNowDate = void 0;
const getNowDate = () => {
    const nowDate = new Date();
    const day = nowDate.getDate();
    const month = nowDate.getMonth();
    const year = nowDate.getFullYear();
    return `${year}-${month + 1}-${day}`;
};
exports.getNowDate = getNowDate;
//# sourceMappingURL=date.utils.js.map