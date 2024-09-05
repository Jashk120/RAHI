"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_typescript_1 = require("sequelize-typescript");
const fs = __importStar(require("fs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const request_model_1 = __importDefault(require("../models/request.model"));
const categories_model_1 = __importDefault(require("../models/categories.model"));
const complaint_model_1 = __importDefault(require("../models/complaint.model"));
dotenv_1.default.config({ path: './.env' });
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DIALECT, CA_PATH } = process.env;
if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME || !DB_DIALECT || !CA_PATH) {
    throw new Error('One or more environment variables are missing');
}
const sequelize = new sequelize_typescript_1.Sequelize({
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    dialect: DB_DIALECT,
    models: [user_model_1.default, request_model_1.default, categories_model_1.default, complaint_model_1.default],
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync(CA_PATH).toString(),
        }
    }
});
exports.default = sequelize;
