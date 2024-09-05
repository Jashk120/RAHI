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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define the User model
let User = class User extends sequelize_typescript_1.Model {
    email;
    fullname;
    password;
    refreshToken;
    // Method to compare password
    async comparePassword(password) {
        return await bcrypt_1.default.compare(password, this.password);
    }
    // Method to generate access token
    generateAccessToken() {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const expiresIn = process.env.ACCESS_TOKEN_EXPIRY;
        if (!secret || !expiresIn) {
            throw new Error('ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY is not defined');
        }
        return jsonwebtoken_1.default.sign({
            _id: this.id,
            email: this.email,
            fullname: this.fullname,
        }, secret, {
            expiresIn,
        });
    }
    // Method to generate refresh token
    generateRefreshToken() {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const expiresIn = process.env.REFRESH_TOKEN_EXPIRY;
        if (!secret || !expiresIn) {
            throw new Error('REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY is not defined');
        }
        return jsonwebtoken_1.default.sign({
            _id: this.id,
        }, secret, {
            expiresIn,
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    })
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], User.prototype, "fullname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], User.prototype, "refreshToken", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'users',
        timestamps: true,
    })
], User);
exports.default = User;
