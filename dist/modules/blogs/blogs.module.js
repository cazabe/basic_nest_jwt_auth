"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_entity_1 = require("./entities/blogs.entity");
const blogs_controller_1 = require("./controllers/blogs.controller");
const blogs_service_1 = require("./services/blogs.service");
const backoffice_controller_1 = require("./controllers/backoffice.controller");
const providers_1 = require("../../providers");
let BlogsModule = exports.BlogsModule = class BlogsModule {
};
exports.BlogsModule = BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([blogs_entity_1.BlogsEntity])],
        providers: [blogs_service_1.BlogsService, providers_1.SlugProvider],
        controllers: [blogs_controller_1.BlogsController, backoffice_controller_1.BackofficeController],
    })
], BlogsModule);
//# sourceMappingURL=blogs.module.js.map