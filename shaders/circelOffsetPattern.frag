#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER
#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

vec2 offsetting(in vec2 st, in float offset){
  float time = fract(u_time* 0.4) ;

  if(time < 0.5){
    st.x += (step(1., mod(st.y, 2.)) * 2. -1.) * time * 2.;
  } else {
    st.y += (step(1., mod(st.x, 2.)) * 2. -1.) * time * 2.;
  }

  return st;
}

vec2 tiling(in vec2 st, in float zoom){
	st *= zoom;
  	st = offsetting(st, sin(u_time));
  	st = fract(st);
	return st;
}

float circle(in vec2 st, in float size){
  st = st * 2. - 1.;
  float smoothing = size * 0.05;
	return mix(1., 0., smoothstep(size - smoothing, size + smoothing, length(st)));
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    st.x *= u_resolution.x / u_resolution.y;

    //st = tiling(st);
    float circle1 = circle(tiling(st, 20.), 0.5);
    float circle2 = circle(tiling(st, 5.), 0.8);

    //color = vec3(color[0], color[1], color[2]);
    vec3 color = mix(vec3(0.), vec3(1.), vec3(circle1));

    gl_FragColor = vec4(vec3(circle1 * circle2), 1.0);
}
