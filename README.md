Vogoor
===========

By using this package you will be able to write pure css directly in class attributes. This way reading and writing css utility classes gets much easier. The css class selectors will be created on build time and added to your main css file. [Here](<https://github.com/webvun/demo-vogoor>) is a demo.

````js
<h2 class = "color:red padding:20px pl:10px f:left">A Title</h2>
````

* [Installation](#installation)
* [Getting Started](#getting-started)
* [How To Use](#how-to-use)
* [Customization](#customization)

## Installation

    npm install vogoor

## Getting Started
Configure your build script to run **node_modules/vogoor/build/start.js** and watch for changes in your html files. Pass the path to your main css file and the html files folder.

````js
    node node_modules/vogoor/build/start.js <path-to-your-main-css-file> <path-to-your_html_files_folder>
````
path-to-your-main-css-file = The newly generated class selectors will be added to this file.<br />
path-to-your_html_files_folder = The script will go through the html files in this folder.

 
### Example build

Package.json

````js
...
    ...

    "watch": {
      "vogoor": {
        "patterns": [
          "<path-to-your_html_files_folder>"
        ],
        "extensions": "html"
      }
    },
    "scripts": {
      "watch": "npm-watch",
      "vogoor": "node node_modules/vogoor/build/start.js \"<path-to-your-main-css-file>\" \"<path-to-your_html_files_folder>\" "
      "build": "npm run watch vogoor"
    },

    ...
...
````

Command **npm run build** will run the script vogoor and watch for changes in your html files.

This example uses the package [npm-watch](<https://www.npmjs.com/package/npm-watch>) to watch for changes in html files. Install it if you have not already done. 


## How to use
Write the css property as classname. Default value separator is underscore.
````js
<h2 class = "color:red padding:10px_20px float:left" > A Title </h2>
````
You can also add your own shortened property names 
````js
<h2 class = "c:red pl:10px fl:left" > A Title </h2>
````

## Customization
First time the script runs, a config file will be generated in the root folder of your application.

### vogoor.conf.json
````js
    {
        "cssFilePath": "",
        "htmlDirPath": "",
        "prefix": false,
        "propertySeparator": ":",
        "valueSeparator": "_",
        "shortClassNames": [
            {
                "name": "color",
                "short": "c"
            },
            {
                "name": "padding-top",
                "short": "pt"
            },
            {
                "name": "padding",
                "short": "p"
            }
        ],
    }
````

## Demo
Check out the demo [Here](<https://github.com/webvun/demo-vogoor>) to see how to it is installed used.
