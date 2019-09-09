// Parts of this app where shamelessly pilfered/inspired by the express-generator

import * as path from 'path';
import ArtworkPrinter from './artwork';

const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
//const git = require('simple-git/promise');
// var Git = require("nodegit");

clear();
console.log(
  chalk.red(
    figlet.textSync('Utah.ts', { horizontalLayout: 'full' })
  )
);

var walk = function(dir:string) {
  let results: Array<string> = [];
  var list = fs.readdirSync(dir)
  list.forEach(function(file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) { 
          /* Recurse into a subdirectory */
          results = results.concat(walk(file));
      } else { 
          /* Is a file */
          results.push(file);
      }
  });
  return results;
}

console.log("\n");

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

var totalDir = walk(destPath)

totalDir.forEach(item => console.log(`create : ${item}`));

process.chdir(destPath);

require('simple-git')()
     .init()
     .add('./*')
     .commit("Initial commit")

console.log('Initializing git repository');




console.log('\n' + "Project successfully created. Commence beachstorming.\n\n")

ArtworkPrinter.printArtwork();

