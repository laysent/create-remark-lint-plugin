const remark = require('remark');
const vfile = require('to-vfile');
const rule = require('.');

describe('%LINT_NAME%', () => {
  function process(markdown) {
    return new Promise((resolve, reject) => {
      remark()
        .use(rule)
        .process(vfile({ path: 'input.md', contents: markdown }), (error, file) => {
          if (error) reject(error);
          else resolve(file.messages.map(String));
        });
    });
  }
  it('should pass when ...', () => {
    const markdown = '';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([]);
    });
  });
});
