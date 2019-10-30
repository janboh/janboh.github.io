
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float sphereSDF(vec3 p) {
    return length(p) - 1.0;
}

void main() {
 vec2 st = gl_FragCoord.st/u_resolution;
    st.x *= u_resolution.x / u_resolution.y;

    gl_FragColor = vec4(vec3(1.0), 1.0);

}