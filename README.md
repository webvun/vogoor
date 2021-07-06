Vogoor
===========

Write css directly in class attribute. Generates CSS utility classes on the fly.

* [Installation](#installation)
* [Getting Started](#getting-started)
* [How To Use](#how-to-use)

## Installation

    npm install lizia --save

## Getting Started

### With Angular

**Add the path of the package to script array in your angular.json file**
````js
...
"styles": 
    "scripts": ["src/libs/underscore_css/src/index.js"]
  },
...
````

## How to use
Write the css property as classname. Default value separator is _
````js
<h2 class = "color:red padding:10px_20px float:left" > A Title </h2>
````
Short names
````js
<h2 class = "c:red pl:10px fl:left" > A Title </h2>
````

## Customize
An object of the Lizia class will be available

*** Add short class names ***
````js
UnderscoreCSSObject.addShortClassNames([
  {name: "color", short:"c"},
  {name: "padding-top", short:"pt"},
  {name: "p", short:"padding"},
]);
````

*** Typescript ***

Declare first the object
````js
  declare let UnderscoreCSSObject: any;
]);
