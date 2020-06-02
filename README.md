# Animate

Animate async functions in controllable scopes. 

Examples: [tween](https://samuelpetersson.github.io/animate/examples/tween.html), [fixed](https://samuelpetersson.github.io/animate/examples/fixed.html)


## Install

`npm install @samuelpetersson/animate`

## Usage

```javascript
import animate, {curve, blend} from '@samuelpetersson/animate'

//Tween background color
await animate.tween({duration: 2}, blend.style(document.body, {backgroundColor:'#FF0099'}))

//Wait 1 second...
await animate.delay(1)

//Bullet time!
animate.scale = 0.1

//Tween myElement width and height
await animate.tween({duration: 2, curve: curve.smoothstep}, blend.style(myElement, {width:'100%', height:'400px'}))

//Stop all animations created in the animate scope
animate.clear()

//Create a new scope
var {tween} = animate.scope()

//Tween custom value
await tween({duration:4}, (f) => console.log('Current tween value:', f))
```

## Reference

**scope (animate)**

- `pause:boolean` Indicates whether the scope is paused or not.

- `scale:number` Delta time multiplier. (use this to speed up or slow down an entire scope)

- `scope(scale:number = 1):Scope` Returns a new scope.	

- `clear()` Clear all animations in current scope.

- `until(solve:(deltaTime:number) => boolean):Promise` Resolves when the solve function returns true. 

- `every(items:Promise[]):Promise` Resolves when all promises in the items array has resolved. 

- `delay(duration:number):Promise` Resolves when the accumulated time has reached `duration`.

- `tween({duration:number, curve:(t:number) => number}, mixer:(f:number) => void):Promise` Runs `mixer` with the accumulated time normalized (0 to 1). `duration` specifies duration in seconds. `curve` specifies a function to ease the normalized value.

- `fixed({fps:number, max:number}, update:(fixedDeltaTime:number) => boolean, render:(progress:number) => void)` Runs `update` with a fixed delta time and `render` with the progress in the last time step. `fps` specifies update frames per seconds. `max` specifies an update limit.


**curve**

- `smoothstep(t:number) => number`
- `smootherstep(t:number) => number`
- `powerIn(exp):(t:number) => number`
- `powerOut(exp):(t:number) => number`
- `powerInOut(exp):(t:number) => number`


**blend**

- `float(a:number, b:number, t:number):number` Returns float between a and b.
- `color(a:number, b:number, t:number):number` Returns color between a and b.
- `angle(a:number, b:number, t:number):number` Returns angle between a and b.
- `mixer(target:Object, values:Object, create:(property) => (t:number) => void)` Returns a new mixer function.
- `style(target:Element, values:Object)` Returns a new mixer function .