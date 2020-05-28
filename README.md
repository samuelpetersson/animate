
Animate helps writing animated async functions in a controllable context.

**Demos**

[tween](./demos/tween.html)


### Concept

**until**

`animate.until` takes a function as argument which will be called every animation frame *until* it returns true:

```javascript
animate.until(dt => /*runs until we return true*/)
```

It uses promises which keeps our animation sequences manageable and flat:

```javascript
await animate.until(...
await animate.every([
	animate.until(...
	animate.until(...
])
console.log('done!')
```

Using the `until` function we can write a delay function:

```javascript
var time = 0
await animate.until(dt => (time += dt) >= 2)
console.log('2 seconds delay done!')
```

This example is actually already implemented as the delay function: `await animate.delay(2)`

**tween**

Another function based on `until` is `tween`. Interpolate be*tween* two values over time:

```javascript
animate.tween({duration:2, curve:smoothstep}, (v) => console.log('current tween value:', v))
```

**scope**

The `animate` object is a context aware scope, which we can use to control our animations with:

```javascript
//Bullet time!
animate.scale = 0.1

//Clear all
animate.clear()
```

Usually we need to control a subset of animations so we use `animate.scope` to create a new animate object:


```javascript
var group = animate.scope()

group.tween(...
group.tween(...

//Clear only this group
group.clear()

```


### Reference

**animate (scope)**

- `pause` Boolean indicates whether the scope is paused or not.
- `scale` A number which will be multiplied with delta time. (use this to speed up or slow down an entire scope)
- `scope(scale)` Returns a new animate scope. The scale argument is optional (Defaults to 1).	
- `clear()` Clear all animations in current scope.
- `until(solve)` Resolves when the solve function returns true. 
- `every(items)` Resolves when all promises in the items array has resolved. 
- `delay(duration)` Resolves when the accumulated time has reached `duration`.
- `tween({duration, curve}, interp)` Runs `interp` with the accumulated time normalized (0 to 1). `duration` specifies the time scale. `curve` specifies a function to ease the normalized value.
- `fixed({fps, max}, update, render)` Runs `update` with a fixed delta time and `render` with the progress in the last time step.


**animate/curve**

- `smoothstep`
- `smootherstep`
- `powerIn(exp)`
- `powerOut(exp)`
- `powerInOut(exp)`


**animate/lerp**

- `float(a, b, t)` Calculates float between a and b.
- `color(a, b, t)` Calculates color between a and b.
- `angle(a, b, t)` Calculates angle between a and b.


### To do

**animate/interp**

- `style(source, target)` Returns a new interpolation function for dom element style.

- *Maybe add:* `animate.style({duration, curve}, element, {width:40, color:0xff0099})`



### Examples

**Tween sequence**
```javascript
var {tween, delay} = animate.scope()

await tween({duration: 2}, (f) => {
	document.body.style.backgroundColor = '#' + lerp.color(0xffffff, 0xff0099, f).toString(16)
})

await delay(1)

await tween({duration: 2, curve.powerInOut(2)}, (f) => {
	element.style.width = lerp.float(0, 100, f) + '%'
	element.style.height = lerp.float(0, 100, f) + '%'
})
```


**Simulate**
```javascript
var update = function(dt) {
	prevState = nextState
	integrate(nextState, dt)
}

var render = function(f) {
	currentState = lerp(prevState, nextState, f)
}

animate.fixed({fps:60}, update, render)
```




