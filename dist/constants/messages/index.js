"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const blogs_json_1 = __importDefault(require("./blogs.json"));
const file_json_1 = __importDefault(require("./file.json"));
const news_json_1 = __importDefault(require("./news.json"));
const users_json_1 = __importDefault(require("./users.json"));
const terms_json_1 = __importDefault(require("./terms.json"));
exports.messages = {
    ...blogs_json_1.default,
    ...file_json_1.default,
    ...news_json_1.default,
    ...users_json_1.default,
    ...terms_json_1.default,
};
//# sourceMappingURL=index.js.map