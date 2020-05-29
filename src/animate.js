const enqueue = (function(window) {

  const timestamp = window.performance ? function(){ return window.performance.now() } : function() { return new Date().getTime() }
  const requestFrame = window.requestAnimationFrame || function(callback) { setTimeout(callback, 16) }

  var queue = []
  var active = false
  var time = 0

  const enterFrame = () => {
    var now = timestamp()
    var delta = (now - time) / 1000
    time = now
    var i = 0, length = queue.length
    while(i < length) {
      if(queue[i++](delta)) {
        queue.splice(--i, 1)
        length--
      }
    }
    if((active = length > 0)) {
      requestFrame(enterFrame)
    }
  };

  return function(item) {
    queue.push(item)
    if(!active) {
      active = true
      time = timestamp()
      requestFrame(enterFrame)
    }
    return item
  }

})(typeof window !== "undefined" ? window : {})


const scope = (scale) => {

	var revision = 0

	const context = {
		pause: false,
		scale: isNaN(scale) ? 1 : scale
	}

	const until = solve => new Promise((resolve, reject) => {
		var instance = revision
    enqueue(delta => {
    	if(instance < revision) { 
    		//TODO: Check if we should reject?
    		return true 
    	}
    	if(!context.pause && solve(delta * context.scale)) {
    		resolve()
    		return true
    	}
    })
	})
	

	context.scope = scope
	context.until = until


	context.every = items => Promise.all(items)


	context.clear = () => revision++


	context.delay = duration => {
		var time = 0
		return until(delta => (time += delta) >= duration)
	}


	context.tween = (options, interp) => {
		var curve = options && options.curve
		var duration = options && options.duration || 0
		var position = 0
		return until(delta => {
			position += delta
			if(position < duration) {
				interp(curve ? curve(position / duration) : position / duration)
				return false
			}
			interp(curve ? curve(1) : 1)
			return true
		})
	}


	context.fixed = (options, update, render) => {
		var step = 1 / (options && options.fps || 60)
		var ceil = step * (options && options.max || 10)
		var time = 0
		return until(delta => {
			time += (delta > ceil ? ceil : delta)
			while(time >= step) {
				if(update(step)) {
					return true
				}
				time -= step
			}
			render(time / step)
		})
	}

	return context
}


export default scope()
export * as curve from './curve.js'
export * as lerp from './lerp.js'
