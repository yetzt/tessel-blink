# Make yout Tessel Blink

A simple wrapper around Tessels GPIO to pull digital pins up and down in a blinky manner.

## Usage

``` javascript
var tessel = require("tessel");
var blink = require("tessel-blink");

var led = blink(tessel.port["GPIO"].pin["G3"]);

// make it blink really fast!
led.blink(50);
```

## Methods

### blink(freq)

Make in blink in a certain milliseconds frequency.

### on()

Stop blinking and turn the led on.

### off()

Stop blinking and turn the led off.

## How to connect your LED

Put the longer leg of yout LED into GND and the other in one of the G3 to G6 holes. If it doesn't work, put it in the other way.
