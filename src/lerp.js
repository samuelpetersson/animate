export function float(a, b, t) {
  return (1 - t) * a + t * b
}

export function color(a, b, t) {
  return ((1 - t) * (a >> 16) + t * (b >> 16)) << 16 | ((1 - t) * (a >> 8 & 0xFF) + t * (b >> 8 & 0xFF)) << 8 | ((1 - t) * (a & 0xFF) + t * (b & 0xFF))
}

export function angle(a, b, t) {
  var d = b - a
  if(d >  Math.PI) { d -= Math.PI * 2 }
  if(d < -Math.PI) { d += Math.PI * 2 }
  return a + d * t
}