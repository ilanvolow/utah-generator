
//import * as fs from 'fs';
import * as path from 'path';
//import * as artwork from './beachstorming';


const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const program = require('commander');
import * as commander from 'commander';
import * as fs from 'fs-extra';
// const fs = require('fs-extra')


// Parts of this app where shamelessly pilfered/inspired by the express-generator

// const destinationPath:string = program.args.shift() || '.'

// var _exit = process.exit

// // Re-assign process.exit because of commander
// // TODO: Switch to a different command framework
// process.exit = exit;

// function exit (code) {
//     // flush output for Node.js Windows pipe bug
//     // https://github.com/joyent/node/issues/6247 is just one bug example
//     // https://github.com/visionmedia/mocha/issues/333 has a good discussion
//     function done () {
//       if (!(draining--)) _exit(code)
//     }
  
//     var draining = 0
//     var streams = [process.stdout, process.stderr]
  
//     exit["exited"] = true
  
//     streams.forEach(function (stream) {
//       // submit empty write request and wait for completion
//       draining += 1
//       stream.write('', done)
//     })
  
//     done()
// }
  

var MODE_0666 = parseInt('0666', 8)

const BEACHSTORM_PATH:string = path.join(__dirname, 'beachstorming.txt');
const PROJECT_TEMPLATE_DIR:string = path.join(__dirname, '..', 'proj_files');


clear();
console.log(
  chalk.red(
    figlet.textSync('Utah.ts', { horizontalLayout: 'full' })
  )
);

//console.log(artwork.artwork);

let VERSION = '0.1.0';

let cmd = new commander.Command('utah')
  .version(VERSION, '    --version')
  .usage('[options] [dir]')
  .option('-d, --datastore <datastore>', 'add data store support (lcvp|mongo|postgres) (defaults to lcvp)')
  .parse(process.argv)


let targetDir = cmd.args.shift() || '.';

console.log(PROJECT_TEMPLATE_DIR);
let destPath = path.join('.', targetDir);
fs.mkdirSync(destPath);
fs.copySync(PROJECT_TEMPLATE_DIR, destPath);
// console.log(destPath);
//if (!_exit["exited"]) {
   // main()
//}

// function main() {

//     console.log(destinationPath);
// }
// class UtahProjGenerator {

//     static generate(args:any) {

//     }
// }
//const beachStormFile = path.join(BEACHSTORM_PATH, 'beachstorming.txt');

// fs.readFile(BEACHSTORM_PATH, 'utf8', function(err, data) {
//     if (err) throw err;
//     // console.log('OK: ' + filename);
//     console.log(data)
//   });


// function copyTemplate (from, to) {
//     write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
//   }
//console.log(cmd.datastore)