# tiling_wall.js

Tile images with different sizes on a rectangle of given width.

Adaptation of PHP version to JavaScript.

* [PHP implementation](https://github.com/nanikaka/tiling_wall) by nanikaka

## Browser example

* http://jsfiddle.net/W2pJ2/
* test/browser.html (basically the same as the above)

## Install

via bower

```
$ bower install https://github.com/edvakf/tiling_wall_js.git
```

via npm

```
$ npm install tiling_wall_js
```

## Usage

```
var TilingWall = require('tiling_wall_js').TilingWall;

// targets can be an array or object of values that have `width` and `height`
var targets = [
  {width: 10, height: 10},
  {width: 5, height: 15},
  {width: 20, height: 13},
  {width: 7, height: 17},
];

var tw = new TilingWall(targets);
var results = tw.arrange(50);

// if targets is an array, then an array is returned (order preserved)
// if targets is an object, then an object is returned (with matching keys)
console.log(results);
/*
=>
[ { width: 30.153917910447763,
    height: 30.153917910447763,
    x: 9.794776119402982,
    y: 0 },
  { width: 10.051305970149254,
    height: 30.153917910447763,
    x: 39.94869402985074,
    y: 0 },
  { width: 9.794776119402984,
    height: 6.366604477611939,
    x: 0,
    y: 23.787313432835823 },
  { width: 9.794776119402984,
    height: 23.78731343283582,
    x: 0,
    y: 0 } ]
*/

console.log(tw.height); // height of the tiled rectangle
// => 291.1255411255412
```

## Theory

* [Zhipeng Wu and Kiyoharu Aizawa: "Building Friend Wall for Local Photo Repository by Using Social Attribute Annotation" JOURNAL OF MULTIMEDIA, VOL. 9, NO. 1, JANUARY 2014](http://www.ojs.academypublisher.com/index.php/jmm/article/view/jmm0901413) (full text pdf available)
