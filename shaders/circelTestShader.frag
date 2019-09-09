#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER
#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

float border(in vec2 st, in float size){
	vec2 bl = step(vec2(size), st);
    vec2 tr = step(vec2(size), 1.0 - st);
	return bl.x * bl.y * tr.x * tr.y;
}

float rect(in vec2 st, in vec2 pos, in vec2 size){
	//size = 0.25-size*0.25;
    
    vec2 bl = step(pos, st);
    vec2 tr = step(pos + size, 1.0 - st);
	return bl.x * bl.y * tr.x * tr.y;
}

float rect2(in vec2 st, in vec2 size){
	//size = 0.25-size*0.25;
    vec2 uv = step(size, st*(1.0-st));
	return uv.x*uv.y;
}

float circle(in vec2 st, in vec2 point, in float size){
	return smoothstep(size, size + size * 4.5, fract(distance(point, st) * 20.));
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
 
    float circle =
   		circle(st, vec2(sin(u_time)/2.+0.5, cos(u_time)/2.+0.5), 0.1) *
   		circle(st, vec2(sin(u_time * 0.5)/2.+0.5, cos(u_time * 0.5)/2.+0.5), 0.2)
   	;

    //color = vec3(color[0], color[1], color[2]);
    vec3 color = mix(vec3(0.), vec3(1.), vec3(circle));// * -1.0 + 1.);

    gl_FragColor = vec4(color, 1.0);
}
