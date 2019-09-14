#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER
#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

vec2 offsetting(in vec2 st, in float offset){
  float time = fract(u_time* 0.2) ;

  if(time < 0.5){
    st.x -= time;
  } else {
    st.y -= time;
  }

  return st;
}

vec2 tiling(in vec2 st, in float zoom){

	st *= zoom;
  //st = offsetting(st, sin(u_time));
  st = fract(st);

	return st;
}

float circle(in vec2 st, in float size){
  st = st * 2. - 1.;
  float smoothing = size * 0.05;
	return mix(1., 0., smoothstep(size - smoothing, size + smoothing, length(st)));
}

float strokeH(in vec2 st){
  return smoothstep(0.44, 0.46, fract(st.y)) - smoothstep(0.54, 0.56, fract(st.y));
}

float strokeV(in vec2 st){
  return smoothstep(0.44, 0.46, fract(st.x)) - smoothstep(0.54, 0.56, fract(st.x));
}

vec2 bending(in vec2 st){
  st = st * 2. - 1.;
  return vec2(length(st), atan(st.x, st.y) / (M_PI * 2.));
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    //vec2 st = gl_FragCoord.st;
    //st.x *= u_resolution.x / u_resolution.y;

    
    st = bending(st);
    //st = rotate2d( M_PI * 0.22 ) * st;

    //tiling
st *= 10.;
    //Movement
    //st.y = fract(st.y + u_time * 0.5);
        

    float n =  noise(st);
    float circle1 = n;

    
    gl_FragColor = vec4(vec3(circle1), 1.0);
}
