# Animate

Animate async functions in controllable scopes. 

Examples: [tween](https://samuelpetersson.github.io/animate/examples/tween.html), [fixed](https://samuelpetersson.github.io/animate/examples/fixed.html)


## Install

`npm install @samuelpetersson/animate`

## Usage

```javascript
import animate, {lerp, curve} from '@samuelpetersson/animate'

//Tween background color
await animate.tween({duration: 2}, (f) => {
  document.body.style.backgroundColor = '#' + lerp.color(0xffffff, 0xff0099, f).toString(16)
})

//Wait 1 second...
await animate.delay(1)

//Bullet time!
animate.scale = 0.1

//Tween myElement width and height
await animate.tween({duration: 2, curve: curve.smoothstep}, (f) => {
  myElement.style.width = lerp.float(100, 0, f) + '%'
  myElement.style.height = lerp.float(50, 400, f) + 'px'
})

//Stop all animations created in the animate scope
animate.clear()

//Create a new scope
var animate2 = animate.scope()
```

## Reference

**Animate**

- `pause:boolean` Indicates whether the scope is paused or not.

- `scale:number` Delta time multiplier. (use this to speed up or slow down an entire scope)

- `scope(scale:number = 1):Animate` Returns a new animate scope.	

- `clear()` Clear all animations in current scope.

- `until(solve:(deltaTime:number) => boolean):Promise` Resolves when the solve function returns true. 

- `every(items:Promise[]):Promise` Resolves when all promises in the items array has resolved. 

- `delay(duration:number):Promise` Resolves when the accumulated time has reached `duration`.

- `tween({duration:number, curve:(t:number) => number}, interp:(f:number) => void):Promise` Runs `interp` with the accumulated time normalized (0 to 1). `duration` specifies duration in seconds. `curve` specifies a function to ease the normalized value.

- `fixed({fps:number, max:number}, update:(fixedDeltaTime:number) => boolean, render:(progress:number) => void)` Runs `update` with a fixed delta time and `render` with the progress in the last time step. `fps` specifies update frames per seconds. `max` specifies an update limit.


**curve**

- `smoothstep(t:number) => number`
- `smootherstep(t:number) => number`
- `powerIn(exp):(t:number) => number`
- `powerOut(exp):(t:number) => number`
- `powerInOut(exp):(t:number) => number`


**lerp**

- `float(a:number, b:number, t:number):number` Returns float between a and b.
- `color(a:number, b:number, t:number):number` Returns color between a and b.
- `angle(a:number, b:number, t:number):number` Returns angle between a and b.


**interp**

- `style(source, target)` Returns a new interpolation function for dom element style. **Not yet implemented!**