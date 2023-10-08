// const {iconLoad} = require('./shortecode/alwatr-iconLoad.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'assets': '/',
  });
  
  eleventyConfig.addWatchTarget('./site/');

  eleventyConfig.setQuietMode(true);

  eleventyConfig.addTransform('trimer', (content) => content.trim());

  // eleventyConfig.addShortecode

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