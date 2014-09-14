MultiMethodJS
=============

Multiple dispatch for JavaScript

Installation
------------

The "multi_method.js" is located at "public_html/src/".
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
collide_message = '';

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

a = new Asteroid();
s = new Spaceship();
g = new GiantSpaceship();
score = 0;
score += collide(a, s); // score = 11
score += collide(s, s); // score = 31
score += collide(s, a); // score = 42
score += collide(a, a); // score = 44
score += collide(g, g); // score = 244
score += collide(g, a); // score = 345
```
