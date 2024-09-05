"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: './.env'
});
const index_1 = __importDefault(require("./db/index"));
const app_1 = require("./app");
const port = process.env.PORT || 3000;
index_1.default.authenticate()
    .then(() => {
    index_1.default.sync({ force: true })
        .then(() => {
        console.log("\nSync successfull \n");
    }).catch((error) => { console.log("\nSync Error:", error.message, " \n"); });
    app_1.app.on("error", (error) => {
        console.log("Error:", error);
        throw error;
    });
    console.log("\nConnected to: ", index_1.default.options.dialect);
    console.log("Host: ", index_1.default.config.host, "\n");
    app_1.app.listen(port, () => {
        console.log(`\nListening to Port: ${port}\nLink: http://localhost:${port}\n`);
    });
})
    .catch((error) => {
    console.log("PostgreSQL Connection Error:", error);
});
