const {arIcon} = require('./shortcode/ar-icon.js');


module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'assets': '/',
  })
  
  eleventyConfig.addWatchTarget('./site/');
  eleventyConfig.addWatchTarget('./shortcode/');

  eleventyConfig.addAsyncShortcode('arIcon', arIcon);

  return {
    HTMLTemplateEngine: 'njk',
    dir: {
      input: 'content',
      output: 'show',
      includes: '_includes',
      data: '_data',
      layouts: '_layouts',
    },
  }
};
