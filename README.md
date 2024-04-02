# Name Sorter CLI

This repository contains a CLI implementation for sorting names in a given text file. It uses [NestJS](https://nestjs.com/) and [Nest Commander](https://nest-commander.jaymcdoniel.dev/en/introduction/intro/).

### Why use NestJS?
In software development, like with anything else, every tool has its pros and cons, and NestJS is no exception. There are areas where a tool will excel or falter, and that's acceptable because our goal isn't to find the absolute best tool, but rather one that propels us forward efficiently in the solution space. NestJS emerged as the preferred choice over other options such as AdonisJS or ExpressJS. 

- NestJS is a popular JavaScript framework which enjoys wide adoption in the community. It's been battle-tested and is supported by a mature segment of the  community. This means that picking up the framework is a boon for (less-)experienced developers because documentation, dependencies and examples are accessible.
- NestJS takes an opinionated stance about how you approach building applications. While this stiffles creativity, control and flexibility, the framework trades that off with structure and convention which are important for delivery, maintainability and developer experience.

## Table of Contents
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Assumptions and Considerations](#assumptions-and-considerations)
- [Running Tests](#running-tests)

## Installation

1. Install Node.js version `>= v20.10.0`. If you don't have node.js `>= v20.10.0` readily installed you can install NVM as per the following [instructions](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating). Once NVM is installed you can follow the instructions below to install a compatible Node.js version. You can check the available versions using `nvm ls-remote` and choose a version from the list.

```bash
$ nvm use 20.10.0
$ nvm alias default 20.10.0
# You'll need to restart your `bash` session with `source ~/.bashrc` for each window (you'll need to terminate successive tabs associated with each window) or by closing and starting a new Terminal application.
```

2. Now that you've the correct Node.js version install you can `git clone` the repository.

```bash
$ git clone git@github.com:tafadzwagonera/name-sorter.git
```

3. Install dependencies.

```bash
$ cd ~/path/to/name-sorter # Verify that you're in `name-sorter` directory.
$ pwd # Verify that you're in `/path/to/frontend-test-tafadzwagonera` directory.
$ npm i
```

Now that you've everything set up it's time to run the application

## How To Run

To run the CLI application, use the following commands

```bash
$ pwd # Verify that you're in `path/to/name-sorter` directory otherwise `cd ~/path/to/name-sorter`
$ npm run build
$ npm i -g . # Install the CLI as an global package
$ npm ls -g --depth=0 # Verify if the page is installed. See Exhibit 1
$ chmod +x ./dist/main.js # Provie executable privileges to the CLI script, If you don't `chmod` the terminal will fail and exit with permission error.
```

#### NB: If you're on PowerShell you'll need to run the `chmod +x` near equiavlent as explained [here](https://superuser.com/questions/1722115/is-there-a-chmod-x-equivalent-in-windows-10-11-to-allow-running-scripts-in-pow)

### Exhibit 1
```bash
# This `bash` snippet assumes that you're on Ubuntu. The `/home/<user/...` path will be different depending on your OS.
/home/<user>/.nvm/versions/node/<version>/lib
├── @bar/@1.0.0
├── baz/@2.0.0
├── ...
├── name-sorter@0.0.1 -> path/to/name-sorter/repository
└── npm@10.2.4
```

At this point the CLI application should be running and ready to your input.

```bash
$ name-sorter unsorted-names-list.txt # You can provide a `.txt` file with a different name that is local the repository.
```

Alternatively you can also run the CLI application without packaging the CLI with NPM. All you need to do it `build` and `run` the application as would any other application.

```bash
$ cd ~/path/to/name-sorter # Verify that you're in `name-sorter` directory
$ npm i
$ npm run build
$ npm run start:prod <different-text-file-with-unsorted-names-list>.txt # You can provide a `.txt` file with a different name that is local the repository.
```

## Assumptions and Considerations

The CLI application is built with the following issues in mind.

1. The name of the file provided to the CLI is a plain `.txt` file and no other format.
2. The names supplied in `unsorted-names-list.txt` or any other file local to the repository, say `./<some-other-file-name.txt` are in the following format `<Given Name> [Middle Name] <LastName>`. These names can be required `<>` or optional `[]`. The tokens themselves i.e. `<`, `>`, `[` and `]` are excluded.
3. The CLI application is likely to buckle under stress testing due to poor performance afforded by the single threaded nature of `Promise`s. We can can always get around this huddle by isolating the sorting function in a subprocess spawned by `child_process` running parallel to the parent process.
4. Error handling could use a more human-friendly format. Other than the default `errorHandler` afforded by the `CommandFactory` in `main.ts` I couldn't find a compelling toolset in Nest Commander to handle error formatting like NestJS' `Logger`. 

## Running Tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```