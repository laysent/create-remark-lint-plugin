# %PACKAGE_NAME%

Warn when <!-- how plugin works, goes here -->

## Example

**`valid.md`**

**In**

```markdown
```

**Out**

No messages.

**`invalid.md`**

**In**

```markdown
```

**Out**

```text
```

## Install

```sh
npm install %PACKAGE_NAME%
```

## Usage

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
     "remark-lint",
+    "%PACKAGE_NAME%",
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u remark-lint -u %PACKAGE_NAME% readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
   .use(require('remark-lint'))
+  .use(require('%PACKAGE_NAME%'))
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```

## License

[MIT](https://github.com/%GIT_USERNAME%/%GIT_REPO_NAME%/blob/master/LICENSE) © [%GIT_DISPLAYNAME%](https://github.com/%GIT_USERNAME%)
