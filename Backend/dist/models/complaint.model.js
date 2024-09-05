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
const sequelize_typescript_1 = require("sequelize-typescript");
const request_model_1 = __importDefault(require("./request.model"));
const categories_model_1 = __importDefault(require("./categories.model"));
let Complaint = class Complaint extends sequelize_typescript_1.Model {
    requestId;
    categoryId;
    additionalDetails;
    request;
    category;
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => request_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Complaint.prototype, "requestId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => categories_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Complaint.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    })
], Complaint.prototype, "additionalDetails", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => request_model_1.default)
], Complaint.prototype, "request", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => categories_model_1.default)
], Complaint.prototype, "category", void 0);
Complaint = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'complaints',
        timestamps: true, // Automatically add createdAt and updatedAt
    })
], Complaint);
exports.default = Complaint;
