'use strict';

const assert = require('assert').strict;
const config = require('..');

const allowedTypes = [
  'feat',
  'fix',
  'docs',
  'style',
  'test',
  'refactor',
  'chore',
  'revert',
];

assert.strictEqual(typeof config, 'object');
assert.strictEqual(config.parserPreset, 'conventional-changelog-conventionalcommits');
assert.deepStrictEqual(config.rules['type-enum'], [2, 'always', allowedTypes]);
assert.strictEqual(config.rules['subject-empty'][0], 2);
assert.strictEqual(config.rules['type-empty'][0], 2);

console.info('commitlintConfig tests passed');
