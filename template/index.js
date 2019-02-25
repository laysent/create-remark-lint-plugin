const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');

function processor(tree, file) {

}

module.exports = rule(
  'remark-lint:%LINT_NAME%',
  processor,
);
