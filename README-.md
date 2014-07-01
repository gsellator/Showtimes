# Telex2000
> Telex system for BERG Cloud's Little Printer

## Getting Started
Telex2000 is a minimalistic app that let you send small messages to a Little Printer you own without having to be logged on BERG Cloud official system.
You'll need [NodeJs](http://nodejs.org/) to run it.

First get the 'Direct Print API Code' of your Little Printer. You'll find this on [Berg Cloud developpers website](http://remote.bergcloud.com/developers/littleprinter/direct_print_codes). Put this code on the project's root folder inside a file called `.printer` formated like this :
```json
{
  "code": "XXXXXXXXXXXX"
}
```

Then install dependancies with npm and run the app :
```shell
npm install
node app.js
```

The result should be visible at the address http://localhost:3030/.

If you want to deploy this app, have a look at the Gruntfile.

## Example
My own Little Printer is linked to the following website : http://telex.radio97.fr. You can send me 'Thank you' notes but please don't spam me too much :)