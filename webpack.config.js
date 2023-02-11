const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/projectController.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    devServer: {
        static: "./dist", 
    }, 
};
