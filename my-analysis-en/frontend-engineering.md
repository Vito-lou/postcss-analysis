# project structure

The project structure is simple and clear. The lib folder is the core of the project.
Another important foler is the test folder which can help us understand how to run tests and how the postcss api works.

# entry point analysis from package.json

### main Field

- Purpose: The main field specifies the primary entry point for the package. When a user imports or requires the package, this is the file that will be loaded by default.
- Example: In the package.json, the main field is set to "./lib/postcss.js". This means that if someone uses require('postcss') in a CommonJS environment, Node.js will load ./lib/postcss.js.
- Usage: This field is essential for backward compatibility and ensures that the package works as expected in environments that do not support modern module resolution mechanisms.

### exports Field

- Purpose: The exports field provides a way to define conditional and context-aware entry points for the package. It allows the package to specify different entry points for different environments (like CommonJS, ES modules, browser, etc.) and to hide internal modules from external use.
- Example: In the package.json, the exports field is structured as follows:

```
"exports": {
  ".": {
    "require": "./lib/postcss.js",
    "import": "./lib/postcss.mjs"
  },
  "./lib/at-rule": "./lib/at-rule.js",
  "./lib/comment": "./lib/comment.js",
  // ... other exports
}
The "." key specifies the main entry point for the package. It differentiates between require (for CommonJS) and import (for ES modules).
Other keys like "./lib/at-rule", "./lib/comment", etc., provide specific entry points for individual modules within the package. This allows users to import these modules directly, like import atRule from 'postcss/lib/at-rule'.
```

- Usage: This field is particularly useful for modern JavaScript environments that support ES modules and conditional exports. It helps in optimizing the package for different use cases and ensures that only intended modules are exposed to users, improving encapsulation and maintainability.

#### What if it does not specify "./lib/at-rule": "./lib/at-rule.js", what would happen?

If the exports field in the package.json does not specify "./lib/at-rule": "./lib/at-rule.js", then the import statement import atRule from 'postcss/lib/at-rule' will not work as expected in environments that strictly adhere to the exports field for module resolution.

##### Behavior in Different Environments

1. Modern Environments (ES Modules):

In environments that support ES modules and respect the exports field, attempting to import postcss/lib/at-rule without a corresponding entry in the exports field will result in an error. This is because the exports field explicitly defines which modules are allowed to be imported.

2. Legacy Environments (CommonJS):

In older environments that use CommonJS and do not support the exports field, the behavior might differ. If the environment does not enforce the exports field, it might still attempt to resolve the module by directly accessing the file system path postcss/lib/at-rule. However, this behavior is not guaranteed and can vary between different tools and environments.

In summary, if the exports field does not specify "./lib/at-rule": "./lib/at-rule.js", the import statement import atRule from 'postcss/lib/at-rule' will not work in environments that strictly adhere to the exports field for module resolution.

#### summary

The exports field takes precedence over the main field. However, the exports field is only recognized by Node.js that supports ES6. To maintain compatibility with older versions of Node.js, the main field can be used in conjunction with the exports field.

- The exports field is prioritized over the main field in environments that support it.
- The exports field is specifically recognized by Node.js versions that support ES6.
- To ensure backward compatibility with older Node.js versions, the main field should be used in conjunction with the exports field.

This approach allows package maintainers to leverage the advanced features of the exports field while ensuring that their package remains accessible to a wide range of users, including those using older versions of Node.js.

# Dependencies

## nanoid

Nanoid is used to generate unique identifiers, just like uuid. However, nanoid is challenging the existence of uuid. Its features is as follows. (https://blog.bitsrc.io/why-is-nanoid-replacing-uuid-1b5100e62ed2)

- smaller and faster than uuid
- more secure
- no third party reliance
- compatibility

### Example Usage

```
const { nanoid } = require('nanoid');

// Generate a default 21-character unique ID
const id = nanoid();
console.log(id); // Example output: "V1StGXR8_Z5jdHi6B-myT"
```

## picocolors

picocolors is a lightweight library for adding color and formatting to text in the console or terminal. Its primary purpose is to enhance the readability and aesthetics of command-line interfaces (CLIs) by providing a simple way to apply color and style to output text.

### Example Usage

```
const pc = require('picocolors');

console.log(pc.red('This text is red!'));
console.log(pc.bold(pc.green('This text is bold and green!')));
console.log(pc.underline(pc.blue('This text is underlined and blue!')));
```

## source-map-js

source-map-js is a powerful and essential library for working with source maps in JavaScript. It provides tools for generating, consuming, and manipulating source maps, making it easier to debug and maintain code that has been transformed by various build tools. Its performance and compatibility with the Source Map Revision 3 Proposal make it a valuable asset for developers working with modern JavaScript development workflows.

## @logux/eslint-config

An ESLint shareable config

## size limit and @size-limit/preset-small-lib

@size-limit/preset-small-lib is a preset package for Size Limit, which is a tool for monitoring and controlling the size of your JavaScript libraries and applications. Size Limit helps you ensure that your code remains lightweight and performant by providing insights into the bundle size and helping you set limits to prevent it from growing too large.

### Example Usage

configuration:

```
  "size-limit": [
    {
      "path": "lib/postcss.js",
      "limit": "15 KB"
    }
```

Running Size Limit:

```
npx size-limit
```

## @types/node

@types/node is a package available on npm that provides TypeScript type definitions for Node.js. TypeScript is a superset of JavaScript that adds static types to the language, making it easier to catch errors and provide better tooling support during development.

To use this, after install it, we need to config the tsconfig.json;

@types/node is an essential package for developers working with TypeScript in a Node.js environment. It provides type definitions for Node.js APIs, enhancing the development experience by enabling type checking, autocompletion, and inline documentation. By integrating @types/node into your project, you can write more robust and maintainable TypeScript code that seamlessly interacts with Node.js.

## c8

c8 is a powerful and efficient tool for code coverage reporting in Node.js applications. By leveraging the native capabilities of the V8 engine, c8 provides accurate and detailed coverage data, helping you ensure that your tests are comprehensive and effective. Integrating c8 into your development workflow can significantly improve the quality and reliability of your codebase.

### Example Usage

```
{
  "scripts": {
    "test": "c8 mocha"
  }
}
npm test
```

Viewing Coverage Reports:
After running the tests, c8 will generate coverage reports in the coverage directory by default. You can view the reports by opening the index.html file in the coverage/lcov-report directory in a web browser.

## check-dts

check-dts is a valuable tool for JavaScript projects that provide TypeScript declaration files. It ensures that these files are correct and consistent, improving the TypeScript support for consumers of your library. By integrating check-dts into your development and build processes, you can maintain high-quality TypeScript declarations and enhance the overall developer experience.

## clean-publish

clean-publish is a utility tool designed to help you create a cleaner and more minimalistic package for publishing to npm. When you publish a package to npm, it often includes files and directories that are not necessary for consumers of the package, such as build scripts, development dependencies, and configuration files. clean-publish helps you remove these extraneous files, resulting in a smaller and more focused package.

## concat-with-sourcemaps

concat-with-sourcemaps is a valuable tool for concatenating JavaScript files while maintaining source maps. It ensures that the debugging experience remains intact even after files have been combined, making it an essential part of the build process for modern web applications. By integrating concat-with-sourcemaps into your build scripts, you can optimize your code for production while preserving the ability to debug the original source files.

concat-with-sourcemaps can be used to combine multiple JavaScript files along with their individual source maps into a single file, while also generating a unified source map for the concatenated file. This unified source map allows developers to debug the combined file as if they were debugging the original, separate source files.

### Example Usage:

Let’s consider an example where you have two JavaScript files, file1.js and file2.js, each with their own source maps, file1.js.map and file2.js.map.

Concatenation:

concat-with-sourcemaps concatenates file1.js and file2.js into a single file, say output.js.
Source Map Generation:

It reads the source maps file1.js.map and file2.js.map, and generates a new source map for output.js.
This new source map, output.js.map, contains mappings that allow you to trace any part of output.js back to the corresponding parts of file1.js and file2.js.

## nanodelay

nanodelay is a JavaScript library that provides a simple and lightweight implementation of a delay function using setTimeout with nanosecond precision. While JavaScript's setTimeout function typically operates with millisecond precision, nanodelay aims to offer a more granular control over timing by allowing delays specified in nanoseconds.

## nanospy

nanospy is a JavaScript library designed for monitoring and profiling the performance of asynchronous operations with high precision. It provides tools to measure the duration of asynchronous tasks in nanoseconds, which is particularly useful for debugging and optimizing performance in JavaScript applications.

### Example Usage

```
const nanospy = require('nanospy');

// Example function to demonstrate nanospy
async function example() {
  const spy = nanospy.createSpy();

  spy.start();
  await someAsyncOperation(); // Replace with your actual async operation
  spy.stop();

  const duration = spy.getDuration();
  console.log(`Async operation took ${duration} nanoseconds`);
}

example();
```

## postcss-parser-tests

postcss-parser-tests is an essential tool for developers who are building custom CSS parsers using PostCSS. By providing a comprehensive set of test cases, it ensures that parsers can handle a wide range of CSS syntax correctly, leading to more reliable and standards-compliant CSS processing. Whether you are developing a new PostCSS plugin or enhancing an existing one, integrating postcss-parser-tests into your development workflow can help you catch and fix issues early, resulting in higher-quality code.

### Example Usage

```
const postcssParserTests = require('postcss-parser-tests');
const myCustomParser = require('./path/to/myCustomParser');

describe('My Custom Parser', () => {
  postcssParserTests.eachTest((name, css, expected) => {
    test(name, () => {
      const result = myCustomParser.parse(css);
      expect(result).toEqual(expected);
    });
  });
});
```

## strip-ansi

strip-ansi is a useful library for scenarios where you need to work with plain text and need to remove ANSI escape codes from strings. Whether you are processing log files, preparing text for display in a web application, or working with command-line output, strip-ansi provides a simple and effective way to strip out these codes, ensuring that your text is clean and free of formatting instructions. With its lightweight and performant design, strip-ansi is a valuable tool for any JavaScript developer working with text data.

### Example Usage

```
const stripAnsi = require('strip-ansi');

const stringWithAnsiCodes = '\u001B[4mHello, World!\u001B[0m';
const strippedString = stripAnsi(stringWithAnsiCodes);

console.log(strippedString); // Output: Hello, World!
```

## uvu

uvu is a fast and simple test runner for Node.js, designed to be lightweight and easy to use. It is particularly well-suited for projects that require a minimalistic approach to testing, or for developers who prefer a straightforward and efficient testing experience.

### Example Usage

```
import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('Math.sqrt()', () => {
  assert.is(Math.sqrt(4), 2);
  assert.is(Math.sqrt(144), 12);
  assert.is(Math.sqrt(2), Math.SQRT2);
});

test('JSON', () => {
  const input = {
    foo: 'hello',
    bar: 'world'
  };

  const output = JSON.stringify(input);

  assert.snapshot(output, `{"foo":"hello","bar":"world"}`);
  assert.equal(JSON.parse(output), input, 'matches original');
});

test.run();

```

## ts-node

ts-node is a powerful tool for developers working with TypeScript, providing a convenient way to run TypeScript code directly in Node.js without the need for precompilation. Its support for REPL, type checking, and seamless integration with Node.js makes it an essential part of many TypeScript development workflows. Whether you are prototyping, testing, or developing full-scale applications, ts-node can help you streamline your development process and improve productivity.

Key point: It allows you to run TypeScript code directly without the need for precompiling it to JavaScript.

### What is REPL ?

REPL stands for Read-Eval-Print Loop. It is an interactive computer programming environment that takes user inputs, evaluates them, and returns the result to the user. The REPL cycle consists of four stages:

1. Read: The REPL reads the user's input, parsing it into a data structure in memory.
2. Eval: The REPL evaluates the parsed data structure, executing the code or performing the computation.
3. Print: The REPL prints the result of the evaluation to the user.
4. Loop: The REPL loops back to the first step, waiting for new user input.
   REPLs are commonly used in programming languages and environments to provide an interactive way to test and experiment with code snippets. They are particularly useful for debugging, learning a new language, or quickly prototyping ideas.

#### Examples of REPLs:

- Node.js REPL: The Node.js runtime includes a built-in REPL that allows you to execute JavaScript code interactively.
- Python REPL: The Python interpreter provides a REPL through the python command, allowing you to run Python code line by line.
- Ruby REPL: The irb (Interactive Ruby) tool provides a REPL for Ruby, enabling interactive Ruby programming.
- TypeScript REPL: Tools like ts-node provide a TypeScript REPL, allowing you to interactively write and test TypeScript code.

#### Benefits of Using a REPL:

Immediate Feedback: REPLs provide immediate feedback on code execution, making them ideal for debugging and learning.
Interactive Learning: They facilitate interactive learning by allowing users to experiment with code in real-time.
Quick Prototyping: REPLs are useful for quickly prototyping and testing small code snippets without the need to create a full project.
Exploratory Programming: They support exploratory programming, where developers can explore and understand the behavior of code and APIs interactively.
In summary, a REPL is a powerful interactive programming environment that enables developers to read, evaluate, and print results in a continuous loop, providing a dynamic and responsive way to work with code.

## simple-git-hooks

simple-git-hooks is a lightweight tool designed to manage Git hooks in your projects. Git hooks are scripts that Git executes before or after events such as committing, pushing, and merging. These hooks can be used to enforce coding standards, run tests, or perform other automated tasks to ensure code quality and consistency.

# Development Tools

1. Node.js:

PostCSS supports Node.js versions from 10 onwards, as indicated by the engines field in the package.json. 2. TypeScript:

PostCSS uses TypeScript for type-safe development, as evidenced by the types field pointing to ./lib/postcss.d.ts and the presence of ts-node in the devDependencies. 3. ES Modules:

PostCSS supports both CommonJS and ES modules, as shown by the exports field in the package.json. 4. Linting and Code Style:

- ESLint is used for linting, with a specific configuration from @logux/eslint-config.
- Prettier is configured for code formatting, as indicated by the prettier field in the package.json.

5. Git Hooks:

simple-git-hooks is used to manage Git hooks, ensuring that certain scripts run before committing changes.

# Testing and Quality

Comprehensive testing scripts are in place, including type checking, coverage, integration, and size checking.

1. Unit Testing:

Unit tests are run using uvu, a lightweight test runner. The unit script in scripts indicates that tests are run for files matching \.test\.(ts|js)$.

2. Integration Testing:

Integration tests are run using the test:integration script, which executes node ./test/integration.js.

3. Type Checking:

TypeScript type checking is performed using check-dts, as indicated by the test:types script.

4. Code Coverage:

Code coverage is measured using c8, a code coverage tool for Node.js. The test:coverage script runs the unit tests with coverage reporting.

5. Performance Testing:

Performance is monitored using size-limit, which checks the size of the lib/postcss.js file and ensures it does not exceed 15 KB.

6. Version Testing:

The test:version script runs node ./test/version.js, which ensures that the version of the Processor class matches the version specified in the package.json file.

7. Continuous Integration:

The test script runs all test-related scripts prefixed with test:, ensuring that all tests are executed in a CI environment.

# Script

## test script

```
  "test": "FORCE_COLOR=1 pnpm run /^test:/",
```

1. We cannot see where this project use the variable FORCE_COLOR.
   However, if we use this command to search the whole project:

```
grep -r "FORCE_COLOR" node_modules/
```

We can find that there are many projects in the node_modules used that variable.

2. pnpm run /^test:/; The ^ symbol is a regular expression that matches the beginning of the script name, so it will run all scripts that have names like test:unit, test:integration, etc.

## unit script

```
 "unit": "uvu -r ts-node/register/transpile-only test \"\\.test\\.(ts|js)$\"",
```

- uvu: This is a simple, fast, and effective test runner for Node.js.
- -r ts-node/register/transpile-only: This flag registers ts-node, which allows Node.js to directly execute TypeScript files without precompiling them. The /transpile-only part is an option that tells ts-node to skip type-checking for faster execution.
- test \"\\.test\\.(ts|js)$\": This part specifies the pattern for the test files. It tells uvu to look for files that end with .test.ts or .test.js in their filenames. The backslashes are escaping the special characters for the command line.
