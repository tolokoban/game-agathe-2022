precision mediump float;

varying vec3 varColor;

void main() {
    float x = 2.0 * gl_PointCoord.x - 1.0;
    float y = 2.0 * gl_PointCoord.y - 1.0;
    float radius = x*x + y*y;
    if (radius > 1.0) discard;
    
    float opacity = 1.0 - radius;
    gl_FragColor = vec4(varColor, 0.18 * opacity);
}