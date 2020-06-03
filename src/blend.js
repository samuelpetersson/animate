
var float = function(a, b, t) {
	return (1 - t) * a + t * b
}

var color = function(a, b, t) {
	return ((1 - t) * (a >> 16) + t * (b >> 16)) << 16 | ((1 - t) * (a >> 8 & 0xFF) + t * (b >> 8 & 0xFF)) << 8 | ((1 - t) * (a & 0xFF) + t * (b & 0xFF))
}

var angle = function(a, b, t) {
  var d = b - a
  if(d >  Math.PI) { d -= Math.PI * 2 }
  if(d < -Math.PI) { d += Math.PI * 2 }
  return a + d * t
}


var mixer = function(target, values, create) {
		
	if(!create) {
		create = function(name) {
			var from = target[name]
			var into = values[name]
			return function(t) { 
				target[name] = float(from, into, t)
			}
		}
	}

	var items = {}
	var initialized = false

	return function(t) {

		if(!initialized) {
			for(var name in values) {
				//TODO: Stop other mixer with same target and property?=
				var item = create(name)
				if(item) { items[name] = item }
			}
			initialized = true
		}

		for(var key in items) {
			items[key](t)
		}
	}

}


var style = function(element, values) {

	var dim = /^(\d+\.?\d*)(.*)/
	var hex = /^#([0-9a-fA-f]{6})/
	var rgb = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/

	var parse = function(value) {

		var match

		if((match = dim.exec(value)) !== null) {
			return {value: parseFloat(match[1]), unit: match[2]}
		}

		if((match = hex.exec(value)) !== null) {
			return {value: parseInt(match[1], 16), unit: '#'}
		}

		if((match = rgb.exec(value)) !== null) {
			return {value: (match[1] << 16) | (match[2] << 8) | match[3], unit: '#'}
		}

		//TODO: Add support for more special cases (transform, rgba, etc.)

		return {value: 0, unit: ''}
	}

	return mixer(element, values, (name) => {

		var from = parse(element.style[name])
		var into = parse(values[name])
		var unit = into.unit || from.unit

		from = from.value
		into = into.value
		
		if(unit == '#') {
			return t => element.style[name] = '#' + color(from, into, t).toString(16)
		}

		return t => element.style[name] = float(from, into, t) + unit

	})

}


export default {
	float,
	color,
	angle,
	mixer,
	style
}
