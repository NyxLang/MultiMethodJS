# About

  minimal example of using [phantomjs] with [qunit]

    $ phantomjs run-qunit.js file://`pwd`/test.html
    'waitFor()' finished in 200ms.
    Tests completed in 21 milliseconds.
    5 tests of 5 passed, 0 failed.

# Installation

- `brew install phantomjs`
- `git clone git://gist.github.com/1305062.git phantomjs-qunit && cd phantomjs-qunit`

# Run

- `$ phantomjs run-qunit.js file://`pwd`/test.html`

[qunit]:https://github.com/jquery/qunit
[phantomjs]:http://www.phantomjs.org/
[run-qunit.js]:https://raw.github.com/ariya/phantomjs/master/examples/run-qunit.js
