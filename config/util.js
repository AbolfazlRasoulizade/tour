function trim(content) {
  return content.trim();
}

function humanReadableDate(date) {
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function slugify(string) {
  // return encodeURIComponent(String(string).trim().toLowerCase().replace(/\s+/g, '-'));
  return String(string).trim().toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
}

function jsonParse(content) {
  return JSON.parse(content);
}

function jsonStringify(content) {
  return JSON.stringify(content);
}

module.exports = {
  trim,
  humanReadableDate,
  slugify,
  jsonParse,
  jsonStringify,
};
