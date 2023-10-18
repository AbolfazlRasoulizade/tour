const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const {esbuildFilter, esbuildBuild} = require('./config/esbuild.js');
const {number} = require('./config/i18n.js');
const {markdown} = require('./config/markdown.js');
const {minifyHtml} = require('./config/minify-html');
const {postcssFilter, postcssBuild} = require('./config/postcss.js');
const {trim, humanReadableDate, slugify, jsonParse, jsonStringify} = require('./config/util.js');
const {arIcon} = require('./shortcode/ar-icon.js');
const {image} = require('./shortcode/image.js');

/**
 * 11ty configuration.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    assets: '/',
    'assets/img/meta/favicon.ico': '/favicon.ico',
  });

  eleventyConfig.setQuietMode(true);

  eleventyConfig.on('eleventy.before', esbuildBuild);

  eleventyConfig.setLibrary('md', markdown);

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(directoryOutputPlugin, {
    columns: {
      filesize: true,
      benchmark: true,
    },
    warningFileSize: 400 * 1000,
  });

  eleventyConfig.addFilter('trim', trim);
  eleventyConfig.addFilter('number', number);
  eleventyConfig.addFilter('humanReadableDate', humanReadableDate);
  eleventyConfig.addFilter('slugify', slugify);
  eleventyConfig.addFilter('jsonParse', jsonParse);
  eleventyConfig.addFilter('jsonStringify', jsonStringify);
  eleventyConfig.addAsyncFilter('postcss', postcssFilter);
  eleventyConfig.addAsyncFilter('esbuild', esbuildFilter);

  eleventyConfig.addShortcode('image', image);
  eleventyConfig.addAsyncShortcode('arIcon', arIcon);

  eleventyConfig.addTransform('minifyHtml', minifyHtml);
  eleventyConfig.addTransform('trim', trim);

  eleventyConfig.on('eleventy.after', postcssBuild);

  eleventyConfig.setServerOptions({
    liveReload: true,
    port: 8080,
    showAllHosts: true,

    /**
     * Whether DOM diffing updates are applied where possible instead of page reloads
     */
    domDiff: false,
  });

  eleventyConfig.addWatchTarget('./site/');
  eleventyConfig.addWatchTarget('./shortcode/');

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', '11ty.js', 'md'],
    dir: {
      input: 'site',
      output: 'dist',
      includes: '_includes',
      data: '_data',
      layouts: '_layouts',
    },
  };
};
