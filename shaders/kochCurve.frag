#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main(){
    vec2 st = (gl_FragCoord.xy-(u_resolution.xy*.5))/u_resolution.y;
    vec2 mouse = u_mouse.xy/u_resolution.xy;
    
    
    vec3 color = vec3(0.0);
	
    float radiant = 0.6666666*3.14159;
    vec2 n = vec2(sin(radiant), cos(radiant)); // 0.5 0.5

    float scale = 1.;
    st.x +=.5;
	for(int i = 0; i<5; i++){
        st *= 3.;
        scale *= 3.;
	    st.x -= 1.5;
        
    	st.x = abs(st.x);
	    st.x -= 0.500;
    	st -=  n * min(0.,dot(st, n)) * 2.;
    }
    
    
    float d = length(st - vec2(clamp(st.x, -1.000, 1.), 0));
    color += smoothstep(1./u_resolution.y, 0.000, d/scale);
    //color.rg += st;
    
    
    gl_FragColor = vec4(color,1.0);
}
