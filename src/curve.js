export default {

	smoothstep: function(t) {
		return t * t * (3 - 2 * t)
	},

	smootherstep: function(t) {
		return t * t * t * (t * (t * 6 - 15) + 10)
	},

	powerIn:function(exp) {
		return function(t) { return Math.pow(t, exp) }
	},

	powerOut:function(exp) {
		return function(t) { return 1 - Math.pow(1 - t, exp) }
	},

	powerInOut:function(exp) {
		return function(t) { 
			return t < 0.5 ? Math.pow(t * 2, exp) * 0.5 : 1 - Math.pow(2 - t * 2, exp) * 0.5
		}
	}

}