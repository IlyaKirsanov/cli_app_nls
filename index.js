#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

const {lstat} = fs.promises;

const targerDir = process.argv[2] || process.cwd()

fs.readdir(process.cwd(), async (err, filenames)=>{
	if(err){
		throw new Error(err);
	}	
	const statPromise = filenames.map(filename=>{
		return lstat(path.join(targerDir, filename));
	});

	const allStats = await Promise.all(statPromise);

	for(let stats of allStats){
		const index = allStats.indexOf(stats);
		if(stats.isFile()){

			console.log(filenames[index]);
		}else{
			console.log(chalk.bold.red(filenames[index]));
		}
	}
});



