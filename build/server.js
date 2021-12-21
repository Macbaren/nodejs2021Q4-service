"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./common/config");
const app_1 = require("./app");
/**
 * Logging when App is running
 * @returns void
 */
const appRunLogging = () => {
    console.log(`App is running on http://localhost:${config_1.PORT}`);
};
app_1.server.listen(config_1.PORT || 4000, appRunLogging);
