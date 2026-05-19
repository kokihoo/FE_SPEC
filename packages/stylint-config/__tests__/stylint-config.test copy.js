'use strict';

const assert = require('assert');
const path = require('path');

(async () => {
  const { default: stylelint } = await import('stylelint');
  const filePaths = [path.join(__dirname, './fixtures/index.css')];

  const result = await stylelint.lint({
    configFile: path.join(__dirname, '../index.js'),
    files: filePaths,
    fix: false,
  });

  assert.strictEqual(result.errored, true, 'fixture should trigger stylelint issues');

  assert.ok(Array.isArray(result.results) && result.results.length > 0, 'expected lint reports');
  assert.ok(
    result.results.some((fileResult) => fileResult.warnings && fileResult.warnings.length > 0),
    'expected at least one warning',
  );

  console.info('stylint-config tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
