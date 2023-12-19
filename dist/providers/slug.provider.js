"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugProvider = void 0;
const common_1 = require("@nestjs/common");
const slugify_1 = __importDefault(require("slugify"));
let SlugProvider = exports.SlugProvider = class SlugProvider {
    slugify(slug) {
        return (0, slugify_1.default)(slug, {
            replacement: '-',
            lower: true,
        });
    }
    replacement() {
        return '-';
    }
};
exports.SlugProvider = SlugProvider = __decorate([
    (0, common_1.Injectable)()
], SlugProvider);
//# sourceMappingURL=slug.provider.js.map