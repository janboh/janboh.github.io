#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER
#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

float truchet(in vec2 st, in float xOrient, in float yOrient){

	st.x = mod(xOrient, 2.) >= 1. ? st.x : 1. - st.x;
	st.y = mod(yOrient, 2.) >= 1. ? st.y : 1. - st.y;

  	float smoothing = 0.01;
  	return smoothstep(st.x - smoothing, st.x + smoothing, st.y);
}

float truchetCurve(in vec2 st, in float xOrient, in float yOrient){

	st.x = mod(xOrient, 2.) >= 1. ? st.x : 1. - st.x;
	st.y = mod(yOrient, 2.) >= 1. ? st.y : 1. - st.y;

  	float smoothing = 0.01;
  	return smoothstep(st.x - smoothing, st.x + smoothing, smoothstep(0., 1., st.y));
}

void main() {
  vec2 st = gl_FragCoord.st/u_resolution;
  st.x *= u_resolution.x / u_resolution.y;

  st *= 20.;
    
	float secRowOff = step(2., mod(st.y, 4.));

	float xOrient = step(2., mod(st.x, 4.0)) + secRowOff;
	float yOrient = (step(1., mod(st.x, 4.0)) - step(3., mod(st.x, 4.0))) +
					step(1., mod(st.y, 2.0)) + secRowOff;
	

  st = fract(st);
  float truchet = truchetCurve(st, xOrient, yOrient);

  gl_FragColor = vec4(vec3(truchet), 1.0);
}
