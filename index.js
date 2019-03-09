#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const prompts = require('prompts');
const getGitUserName = require('git-user-name');
const gitconfig = require('git-config-path');
const parse = require('parse-git-config');
const argv = require('yargs').argv;

function getGitEmail() {
  var gc = gitconfig({ type: 'global' });
  var options = { cwd: '/', path: gc };
  var config = parse.sync(options) || {};
  return config.user ? config.user.email : null;
}

const prefix = 'remark-lint-';
let name = argv.name || '';
const useMonoRepo = !!argv.mono;
const folder = argv.folder || (useMonoRepo ? 'packages' : '');
const template = path.resolve(__dirname, 'template');
const displayName = getGitUserName();
const email = getGitEmail();
const currentFolder = path.parse(process.cwd()).base;

function inject(content, config) {
  return Object.keys(config).reduce((text, key) => {
    const pattern = new RegExp(`%${key}%`, 'g');
    return text.replace(pattern, config[key]);
  }, content);
}

prompts([
  {
    type: name ? null : 'text',
    name: 'name',
    message: `What is the name of this lint plugin? ${prefix}`,
    validate(name) {
      if (!name) return 'lint name is required.';
      if (/[^a-z-]/.test(name)) return 'lint name should use lowercase letters only';
      return true;
    },
  },
  {
    type: 'text',
    name: 'username',
    message: `What is your GitHub username?`,
    initial: displayName.toLowerCase().replace(/\s/g, ''),
    validate(name) {
      if (!name) return 'GitHub username is required to generate GitHub repo URLs.';
      return true;
    }
  }
]).then((result) => {
  name = name || result.name;
  if (name.indexOf(prefix) === 0) name = name.substr(prefix.length);
  const packageName = `${prefix}${name}`;
  const lintName = name;
  const destination = path.resolve(process.cwd(), folder, packageName);
  if (fse.existsSync(destination)) {
    console.error(`[FAIL]: ${packageName} already exists.`);
    return;
  }
  fse.ensureDirSync(destination);

  const files = fs.readdirSync(template);
  files.forEach((file) => {
    const from = path.resolve(template, file);
    const to = path.resolve(destination, file[0] === '_' ? file.substr(1) : file);
    let content = fs.readFileSync(from, 'utf8');
    content = inject(content, {
      LINT_NAME: lintName,
      GIT_REPO_NAME: useMonoRepo ? currentFolder : packageName,
      PACKAGE_NAME: packageName,
      GIT_USERNAME: result.username,
      GIT_EMAIL: email,
      GIT_DISPLAYNAME: displayName,
      YEAR: (new Date()).getFullYear(),
    });
    fs.writeFileSync(to, content, 'utf8');
  });
  console.log(`[SUCCESS]: ${packageName} created.`);
});
