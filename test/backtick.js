'use strict';

/**
 * Regression test for GHSA-ptg0-dry0-run1.
 *
 * Legacy IE treats the backtick (`) as an attribute delimiter, so it must be
 * escaped to prevent breaking out of unquoted/quoted attribute values.
 *
 * Run: node test/backtick.js
 */

var assert = require('assert');
var escapeHtml = require('..');

// Fast path: the only special character in the string is a backtick.
assert.strictEqual(
  escapeHtml('`onmouseover=alert(1)'),
  '&#96;onmouseover=alert(1)',
  'backtick-only string must be escaped'
);

assert.strictEqual(escapeHtml('`'), '&#96;', 'lone backtick must be escaped');

// Loop path: backtick mixed with other special characters.
assert.strictEqual(
  escapeHtml('<`>'),
  '&lt;&#96;&gt;',
  'backtick among other specials must be escaped'
);

assert.strictEqual(
  escapeHtml('a"b`c`d'),
  'a&quot;b&#96;c&#96;d',
  'multiple backticks after another special must be escaped'
);

// Existing behaviour must be unchanged.
assert.strictEqual(escapeHtml('no specials'), 'no specials');
assert.strictEqual(escapeHtml('"&\'<>'), '&quot;&amp;&#39;&lt;&gt;');

console.log('ok - GHSA-ptg0-dry0-run1 backtick escaping');
