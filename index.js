#!/usr/bin/env node
//in package.json -> "bin": {
//     "wit": "index.js" //short "watch it"
//   },
//chmod +x index.js
//npm link index.js
const debouce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const {spawn} = require('child_process');
const chalk = require('chalk');

program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action(async ({filename}) => {
    const name = filename || 'index.js';
  
    try{
      await fs.promises.access(name);
    }catch (e) {
      throw new Error('Could not find file - ' + name);
    }
    
    let proc;
    const start =debouce(() =>{
      if(proc){
        proc.kill();
      }

      console.log(chalk.blue('>>>> Starting process...'));
      proc = spawn('node', [name], {stdio: 'inherit'});
    }, 100);

    chokidar.watch('.')
      .on('add',start)
      .on('change',start)
      .on('unlink',start);
  });

program.parse(process.argv);


