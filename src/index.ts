// Parts of this app where shamelessly pilfered/inspired by the express-generator

import * as path from 'path';
import * as commander from 'commander';
import * as fs from 'fs-extra';

const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');

import ArtworkPrinter from './artwork';

var VERSION = require('../package').version

class UtahGenerator {

    public generateUtahProject() {

      // Print initial header at top of screen
      clear();
      this.printUtahHeader()

      // Get the paths of where we want to install stuff
      const PROJECT_TEMPLATE_DIR:string = path.join(__dirname, '..', 'proj_files');
      var MODE_0666 = parseInt('0666', 8)
      var MODE_0755 = parseInt('0755', 8)

      let cmd = new commander.Command('utah')
      .version(VERSION, '    --version')
      .usage('[options] [dir]')
      .option('-d, --datastore <datastore>', 'add data store support (lcvp|mongo|postgres) (defaults to lcvp)')
      .option('    --no-git', 'do not automatically inital and commit git repo for the project')
      .parse(process.argv)

      let targetDir = cmd.args.shift() || '.';
      let destPath = path.join('.', targetDir);

      fs.mkdirSync(destPath);
      fs.copySync(PROJECT_TEMPLATE_DIR, destPath);

      this.renamePackage(destPath, targetDir);

      this.printGeneratedFilesList(destPath)

      if (cmd.git) {
        this.createGitRepo(destPath);
      }
     

      console.log('\n');

      ArtworkPrinter.printArtwork();
      
      console.log('\n' + "Project successfully created. Commence beachstorming.\n\n")
    }

    public renamePackage(destPath: string, targetName: string) {
      let packagePath = path.join(destPath, 'package.json');
      let jsonString = fs.readFileSync(packagePath).toString();
      let packageFile = JSON.parse(jsonString);
      packageFile.name = targetName;
      let packageString = JSON.stringify(packageFile, null, 2);
      fs.writeFileSync(packagePath, packageString);
    }
    
    public printGeneratedFilesList(destPath:string) {
      // Prints a list of all the files in the project directory that have been created
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

      var totalDir = walk(destPath)
      totalDir.forEach(item => console.log(`create : ${item}`));
      console.log('\n');
    }

    public printUtahHeader() {
      // Prints the "Utah.js" ascii art header at the top
      console.log(
        chalk.red(
          figlet.textSync('Utah.ts', { horizontalLayout: 'full' })
        )
      );
    }

    public createGitRepo(destPath:string) {
      // Creates and inits an initial git repository
      // TODO: Put in a flag to avoid automatically initializing a git repo
      process.chdir(destPath);

      require('simple-git')()
          .init()
          .add('./*')
          .commit("Initial commit")

      console.log('Initializing git repository\n');
    }
}

let generator = new UtahGenerator();
generator.generateUtahProject()
