
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    float h = .5;
    float t = u_time / 1.5;
    float x = fract(t) - h;
    float a = t + x - x* abs(x+x);
    float p = 5. / u_resolution.y;

    vec2 U = gl_FragCoord.xy * p;
    vec2 V, C = vec2(h, .25);

    vec4 O = vec4(0.);

    int n = int(mod(t, 4.));
    int i = -1;

    for (mod(float(n), 2.)==1. ? U.y += h, a += 2. : a; i++ < 6 ; O += smoothstep(-p,p, min( t<h||x<.25 ? t : t-h, t<h ? .25-x : 1.-x-t))){
      V = C + (fract( n>1 ? U+h : U) - vec2(mod(float(i), 3.) - 1. , i / 3) - C ) * mat2(cos( a*1.5708 + vec4(0,33,11,0))), x = abs(V.x-h), t = V.y;
    }
        
    mod(2., float(n))==1. ? O= 1.-O : O;
    //gl_FragColor = O;
}