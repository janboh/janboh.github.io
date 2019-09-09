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
    st.x *= u_resolution.x/u_resolution.y;
	st *= 30.0;

	float xCount = floor(st.x);
	float yCount = floor(st.y);

	st = fract(st);

	vec2 pos = vec2(0.5) - st;
	float circleSize = abs(sin(u_time + (xCount * .2) + (yCount * .6)) / 2.);
    float point = smoothstep(circleSize - 0.3, circleSize, length(abs(pos))) + (step(0.3, pos.x) * -1.) +(step(0.3, pos.y) * -1.);


    //color = vec3(color[0], color[1], color[2]);
    vec3 color = mix(vec3(1.), vec3(0.), vec3(point));

    gl_FragColor = vec4(color, 1.0);
}
