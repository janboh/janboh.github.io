#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER
#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

vec2 sinus(in vec2 st, in float amount) {
	return vec2(sin(st.x) * amount, sin(st.y) * amount);
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    
    st = st * 2. -1.;

    vec2 t = sinus(st, 10.5);
    
    gl_FragColor = vec4(vec3(distance(st, t)), 1.0);
}
