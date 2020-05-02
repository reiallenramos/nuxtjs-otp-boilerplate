var randomstring = require('randomstring');

function generate() {
  return randomstring.generate(6);
}

module.exports = {
  generate
}