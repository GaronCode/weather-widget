const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
    outputDir: path.resolve(__dirname, "docs"),
	css: {
		extract: false,
	},
	configureWebpack: {
		optimization: {
			splitChunks: false,
		},
	},
	transpileDependencies: true,
	publicPath: "./",
});
