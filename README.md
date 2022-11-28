
# CanvasAnimation

An exploration of 2D particle simulation using the HTML canvas element and vanilla Javascript. 

## Overview

The canvas element renders at different sizes
and aspect ratios depending on the user's screen.
It generates a series of particles called "heroes" based on user-controlled inputs such as speed, size, colour and number of heroes. We use a class to 
define how these objects should be made, along with some methods for moving bouncing and changing colour.
The start button calls the setinterval function which sets the simulation in motion. The heroes are assigned vectors based around the speed input 
and move around the screen. On collision with a boundary their vectors are reflected, on collision with another particle new vectors are calculated according to
speed of each particle and the angle of collision.

## Motivation

I made this as a starting point for game devlepment down the road. Boundary and collision detection have been solved, but more features need to 
be implemented down the road. Friction, gravity, and allowing a user to control a game-object on the screen are still to come.

## Build Status

This is still very much in its infancy. I want to develop it into a snooker game.
The next features to implement therefore are a user-controlled game object, friction, points, UI etc. 

## Credits

I'm deeply indebted to a number of resources I used to make this happen [Peter Collingridge](https://www.petercollingridge.co.uk/tutorials/pygame-physics-simulation/)
has a great tutorial on this, as does [Spicy Yoghurt](https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics).
