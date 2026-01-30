module.exports = function (eleventyConfig) {
	// Copy assets, CSS, and JS to output
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("send.php");

	return {
		dir: {
			input: "src",
			output: "dist",
			includes: "_includes",
			data: "_data",
		},
	};
};
