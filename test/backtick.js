'use strict';

// Regression test: backtick (`) must be escaped by escapeHtml.
// Run with: node test/backtick.js

var assert = require('assert');
var escapeHtml = require('../index.js');

var cases = [
  // Advisory: backtick must be escaped
  ['`', '&#96;'],
  ['a`b', 'a&#96;b'],
  ['<`>', '&lt;&#96;&gt;'],
  // Existing behaviour preserved
  ['&<>"\'', '&amp;&lt;&gt;&quot;&#39;'],
  ['plain', 'plain']
];

var failures = 0;

cases.forEach(function (c) {
  var input = c[0];
  var expected = c[1];
  try {
    assert.strictEqual(escapeHtml(input), expected);
    console.log('ok   escapeHtml(' + JSON.stringify(input) + ') === ' + JSON.stringify(expected));
  } catch (err) {
    failures++;
    console.error('FAIL escapeHtml(' + JSON.stringify(input) + '): ' + err.message);
  }
});

if (failures > 0) {
  console.error(failures + ' assertion(s) failed');
  process.exit(1);
}

console.log('all assertions passed');
