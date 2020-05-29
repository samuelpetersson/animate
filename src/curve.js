export function smoothstep(t) {
	return t * t * (3 - 2 * t)
}

export function smootherstep(t) {
	return t * t * t * (t * (t * 6 - 15) + 10)
}

export function powerIn(exp) {
	return function(t) { return Math.pow(t, exp) }
}

export function powerOut(exp) {
	return function(t) { return 1 - Math.pow(1 - t, exp) }
}

export function powerInOut(exp) {
	return function(t) { 
		return t < 0.5 ? Math.pow(t * 2, exp) * 0.5 : 1 - Math.pow(2 - t * 2, exp) * 0.5
	}
}