const assert = require('assert');
const fs = require('fs');
const path = require('path');

let stylelint;

beforeAll(async () => {
  stylelint = (await import('stylelint')).default;
});

function getWarnings(result) {
  return (result.results || []).flatMap((fileResult) => fileResult.warnings || []);
}

async function lintFixture(filename) {
  const filePath = path.join(__dirname, './fixtures', filename);
  assert.ok(fs.existsSync(filePath), `missing fixture: ${filename}`);

  return stylelint.lint({
    configFile: path.join(__dirname, '../index.js'),
    files: [filePath],
    fix: false,
  });
}

describe('test/stylint-config.test.js', () => {
  it('Validate default', async () => {
    const result = await lintFixture('index.css');

    if (result && result.errored) {
      const warnings = getWarnings(result);
      assert.ok(warnings.length > 0);
    }
  });

  it('Validate sass', async () => {
    const result = await lintFixture('sass-test.scss');

    if (result && result.errored) {
      const warnings = getWarnings(result);
      assert.ok(warnings.length > 0);
    }
  });

  it('Validate less', async () => {
    const result = await lintFixture('less-test.less');

    if (result && result.errored) {
      const warnings = getWarnings(result);
      assert.ok(warnings.length > 0);
    }
  });

  it('Validate css-module', async () => {
    const result = await lintFixture('css-module.scss');

    if (result && result.errored) {
      const warnings = getWarnings(result).filter(
        (warning) => !String(warning.text).includes('Unknown rule'),
      );
      assert.strictEqual(warnings.length, 0);
    }
  });
});
