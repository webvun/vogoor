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

    npm install vogoor --save

## Getting Started

import index.js in node_modules/vogoor/lib

### Example Angular

Add the path of the package to script array in your angular.json file
````js
...
"styles": 
    "scripts": ["node_modules/vogoor/lib/index.js"]
  },
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
Use the vogoor to customize

### Add shortened class names
````js
vogoor.addShortClassNames([
  {name: "color", short:"c"},
  {name: "padding-top", short:"pt"},
  {name: "p", short:"padding"},
]);
````

### Typescript 

To use in typescript you need to declare the object first
````js
  declare let vogoor: any;
]);
