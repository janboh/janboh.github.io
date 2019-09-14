
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy / u_resolution) * 3.656 -1.568;
    uv.x -= 1.636;
  vec3 color = vec3(0);
    
float speed = u_time * 0.2;
  vec3 rd = vec3(uv.x , uv.y , u_mouse.y * 0.01);
  for (int i = 0; i < 11; i++) {
    rd = abs(rd) / (exp(abs(rd.x)) * 0.888 - exp(abs(rd.y)) * 0.792) - 
        (log(abs(rd.x)) * 1.648 - log(abs(rd.y)) * atan(uv.x, uv.y) / (3.14159 * 2.)) ;
    rd -= -1.200 ;
    color.rgb += rd;
  }
  color *= -0.480 ;
  gl_FragColor = vec4(color, 1.);
}