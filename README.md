MultiMethodJS
=============

[![Build Status](https://travis-ci.org/xianrenb/MultiMethodJS.svg?branch=develop)](https://travis-ci.org/xianrenb/MultiMethodJS)

Multiple dispatch for JavaScript

Installation
------------

The file "multi_method.js" is located at directory "public_html/src/".
Only this single JavaScript file is required.

Usage
-----

```JavaScript
var a, collide_message, g, s, score;

function Asteroid() {
    this.point = 1;
}

function Spaceship() {
    this.point = 10;
}

function GiantSpaceship() {
    // Spaceship.call(this);
    this.point = 100;
}

GiantSpaceship.prototype = create_prototype(Spaceship.prototype);

multi_method('collide', [Asteroid, Spaceship], function (a, b) {
    collide_message = 'Behavior when asteroid hits spaceship';
    return a.point + b.point;
});

multi_method('collide', [Spaceship, Spaceship], function (a, b) {
    collide_message = 'Behavior when spaceship hits spaceship';
    return a.point + b.point;
});

multi_method('collide', [Spaceship, Asteroid], function (a, b) {
    collide_message = 'Behavior when spaceship hits asteroid';
    return a.point + b.point;
});

multi_method('collide', [Asteroid, Asteroid], function (a, b) {
    collide_message = 'Behavior when asteroid hits asteroid';
    return a.point + b.point;
});

multi_method('collide', [GiantSpaceship, GiantSpaceship], function (a, b) {
    collide_message = 'Behavior when giant spaceship hits giant spaceship';
    return a.point + b.point;
});

multi_method('collide', ['string', 'number'], function (a, b) {
    collide_message = 'Behavior when ' + a.toString() + ' hits ' + typeof b;
    return 0;
});

a = new Asteroid();
s = new Spaceship();
g = new GiantSpaceship();
score = 0;
score += collide(a, s); // score = 11, collide_message = 'Behavior when asteroid hits spaceship'
score += collide(s, s); // score = 31, collide_message = 'Behavior when spaceship hits spaceship'
score += collide(s, a); // score = 42, collide_message = 'Behavior when spaceship hits asteroid'
score += collide(a, a); // score = 44, collide_message = 'Behavior when asteroid hits asteroid'
score += collide(g, g); // score = 244, collide_message = 'Behavior when giant spaceship hits giant spaceship'
score += collide(g, a); // score = 345, collide_message = 'Behavior when spaceship hits asteroid'
score += collide('apple', 3.14); // score = 345, collide_message = 'Behavior when apple hits number'
```
