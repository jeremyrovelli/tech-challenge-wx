# tech-challenge-wx

This repository is a Behavior-driven development (BDD) test automation framework involving the following technologies: Cucumber, webdriver.io, Node.js.

It lets you write and run end-to-end ui tests created in the Gherkin language, and interacting with a web application via webdriver.io's API. 

It already contains a feature file that covers the case where a customer wants to purchase items on the shopping website http://automationpractice.com/index.php

## Install

### Install Node.js, npm

Node,js/npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Install nvm and use Node.js version 12
`$nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`

`$nvm install 12`

`$nvm use 12`

### Clone this repository

`$ git clone git@github.com:jeremyrovelli/tech-challenge-wx.git`

### Change to repo director and install all dependencies

`$ cd tech-challenge-wx`

`$ npm i`

## Run tests

### Script to run ui test against the shopping web app

`$ npm run uitest`

### Script to run api test against the weather web app

`$ npm run apitest`
