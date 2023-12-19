"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicAccess = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const PublicAccess = () => (0, common_1.SetMetadata)(constants_1.PUBLIC_KEY, true);
exports.PublicAccess = PublicAccess;
//# sourceMappingURL=public.decorator.js.map