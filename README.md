# CEIS20-ECR-list
programmatically identify CESIS20's Early Career Researchers

## Setup
- make sure you have [nodejs](https://nodejs.org/en) in your system
- clone or [download](https://github.com/omarcostahamido/CEIS20-ECR-list/archive/refs/heads/main.zip) and unzip the repo
- navigate with your terminal to the directory of the repo: `cd CEIS20-ECR-list/`
- install package dependencies: `npm install`

## How to run
- make sure you are on the repo directory
- run the index file with node: `node index.js`
- it will start to print the results, one line every ~2 seconds
- (optional) you can run code with a starting index position `X`: `node index.js X`

## Known issues and getting help
- program may sometimes crash or not retrieve info: see issues [#2](https://github.com/omarcostahamido/CEIS20-ECR-list/issues/2) and [#3](https://github.com/omarcostahamido/CEIS20-ECR-list/issues/3)
- in order to avoid having to retrieve all lines from start you can pass an argument to the start command `node index.js X` which will start the program from line `X`
- if you encounter other issues, need some help, and/or would like to contribute, please head over to the [issues tab](https://github.com/omarcostahamido/CEIS20-ECR-list/issues) and either reply to a relevant issue or [open a new one](https://github.com/omarcostahamido/CEIS20-ECR-list/issues/new).

## Acknowledgements
This tool was developed by [OCH](https://omarcostahamido.com) at [CEIS20](https://www.uc.pt/iii/ceis20), as a contribution to the creation of the ECR Network.
