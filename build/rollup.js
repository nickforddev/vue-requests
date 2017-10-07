const Rollup = require('rollup');
const Uglify = require('uglify-js');
const fs = require('fs');
const path = require('path');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const chalk = require('chalk');
const version = require('../package.json').version;

const outputFolder = path.join(__dirname, '/../', 'dist');

async function main () {
  console.log(chalk.cyan('Generating main builds...'));
  const bundle = await Rollup.rollup({
    input: 'src/index.js',
    plugins: [
      replace({ __VERSION__: version }),
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      })
    ],
  });

  const { code } = await bundle.generate({
    format: 'umd',
    name: 'vue-requests',
    banner:
    `/**
  * vue-requests v${version}
  * (c) ${new Date().getFullYear()} Nick Ford
  * @license MIT
  */`
  });

  const output = path.join(outputFolder, 'vue-requests.js');
  fs.writeFileSync(output, code);
  console.log(chalk.green('Output File:') + ' vue-requests.js');
  fs.writeFileSync(path.join(outputFolder, 'vue-requests.min.js'), Uglify.minify(code, {
    compress: true,
    mangle: true,
  }).code);
  console.log(chalk.green('Output File:') + ' vue-requests.min.js');
}

async function esm () {
  console.log(chalk.cyan('Generating esm builds...'));
  let bundle = await Rollup.rollup({
    input: 'src/index.esm.js',
    plugins: [
      replace({ __VERSION__: version }),
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      })
    ],
  });

  let { code } = await bundle.generate({
    format: 'es',
    name: 'vue-requests',
    banner:
    `/**
  * vue-requests v${version}
  * (c) ${new Date().getFullYear()} Nick Ford
  * @license MIT
  */`
  });

  let output = path.join(outputFolder, 'vue-requests.esm.js');
  fs.writeFileSync(output, code);
  console.log(chalk.green('Output File:') + ' vue-requests.esm.js');
}

async function build () {
  try {
    await main();
    await esm();
  } catch (err) {
    console.log(chalk.red(err));
    throw err;
  }
}

build();