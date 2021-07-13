Vogoor
===========

Write class name as css property and value pair and a utilitiy class will automatically be generated.

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

You need to run the script **vogoor/build/start.js** from your task runner and watch for changes.

### Example package.json

Here using [npm-watch](<https://www.npmjs.com/package/npm-watch>) to watch for changes.
````js
...
    ...

    "watch": {
      "vogoor": {
        "patterns": [
          "src"
        ],
        "extensions": "html"
      }
    },
    "scripts": {
      "watch": "npm-watch",
      "vogoor": "node node_modules/vogoor/build/start.js \"<PATH_TO_YOUR_MAIN_CSS_FILE>\" \"PATH_TO_DIRECTORY_OF_YOUR_HTML_FILES>\" "
    },

    ...
...
````

## How to use
Write the css property as classname. Default value separator is underscore(_)
````js
<h2 class = "color:red padding:10px_20px float:left" > A Title </h2>
````
You can also add your own shortened property names 
````js
<h2 class = "c:red pl:10px fl:left" > A Title </h2>
````

## Customization
Once the script runs, a config file will be generated in the root directory of your application.

### vogoor.conf.json
````js
    {
        "cssFilePath": "test.css",
        "htmlDirPath": "src",
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
                "name": "p",
                "short": "padding"
            }
        ],
    }
````

