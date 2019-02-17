# Alexa, Open AWS Cost Explorer

The Alexa is some cool tech, it allows people to dialog with it about things it has been programmed for, as they would another human.

This skill allows AWS Account holders to query their spend and costs using natural language, eg; “what were my storage costs last month?”

There’s many ways you can use this code, namely copy-paste bits of it, clone the repo, etc.  If you don’t have Alexa, you could even strip out the “alexa” bits and simply use it as a console/terminal app, to query your billing right from the command line.

It’s primary intention though is to get a skill up and running in your AWS account, then stick an Alexa product on your bosses desk and... WIN!

## Setup
This is a brief summary to get setup, targeted at Alexa skill developers and developers in general.  For a more detailed step by step, scroll down a bit to the Detailed Setup section.

* ask clone this repo
* update your skill.json and .ask/config file
* 

##  Detailed Setup
* Install node
* Create a directory, like ~/Users/andrew/alexaskills or C:\users\andrew\alexaskills
* Open your console/terminal/command line app
* CD to your alexaskills directory
* npm install ask-sdk
* npm install aws-sdk
* ask init 
* ask clone
* update your skill.json and .ask/config file
* ask deploy 