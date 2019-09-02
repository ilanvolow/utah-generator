// Parts of this app where shamelessly pilfered/inspired by the express-generator

import * as path from 'path';

const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');

import * as commander from 'commander';
import * as fs from 'fs-extra';

const PROJECT_TEMPLATE_DIR:string = path.join(__dirname, '..', 'proj_files');

var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)
var VERSION = require('../package').version

let cmd = new commander.Command('utah')
  .version(VERSION, '    --version')
  .usage('[options] [dir]')
  .option('-d, --datastore <datastore>', 'add data store support (lcvp|mongo|postgres) (defaults to lcvp)')
  .parse(process.argv)


let targetDir = cmd.args.shift() || '.';
let destPath = path.join('.', targetDir);

fs.mkdirSync(destPath);
fs.copySync(PROJECT_TEMPLATE_DIR, destPath);


clear();
console.log(
  chalk.red(
    figlet.textSync('Utah.ts', { horizontalLayout: 'full' })
  )
);