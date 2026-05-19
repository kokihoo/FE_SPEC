'use strict';

const assert = require('assert').strict;
const config = require('..');

assert.strictEqual(typeof config, 'object');
assert.strictEqual(config.default, true);
assert.strictEqual(config['ul-style'].style, 'dash');
assert(Array.isArray(config['proper-names'].names));
assert(config['proper-names'].names.includes('JavaScript'));

console.info('markdownlintConfig tests passed');
