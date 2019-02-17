# Alexa, Open AWS Cost Explorer

The Alexa is some cool tech, it allows people to dialog with it about things it has been programmed for, as they would another human.

This skill allows AWS Account holders to query their spend and costs using natural language, eg; “what were my storage costs last month?”

There’s many ways you can use this code, namely copy-paste bits of it, clone the repo, use it in the Alexa Skills developer console etc.  If you don’t have Alexa, you could even strip out the “alexa” bits and simply use it as a console/terminal app, to query your billing right from the command line.

It’s primary intention though is to get a skill up and running in your developer Amazon and AWS account, then stick an Alexa product on your bosses desk and... WIN!

This tutorial will get you up and running using the Alexa Ask Cli.

## Setup
Install Node and NPM

and then install the Alex Skills Kit

`npm install -g ask-sdk` 

and then create a new skill using this repository as the template
  
`ask new --url https://github.com/ajhstn/alexa-skill-aws-cost-explorer.git`

and then change directory into the lambda code folder

`cd alexa-skill-aws-cost-explorer/lambda/custom` 

and then install the necessary node modules for this skill

`npm install`

and the change back to the root directory of your skill

`cd ../../`

and then rename your `.ask/config-orig` to `.ask/config`

and then update you `skill.json` file as you wish 

and then deploy the skill to your developer environment

`ask deploy`

## Contribute
I'd love to collaborate with you and build out this cabability
* Fork this repository
* Send a Pull Request