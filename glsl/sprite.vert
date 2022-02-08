// Screen width and height.
uniform vec2 uniScreen;
// Shrink factor of the corridor compared to the screen width.
uniform float uniShrink;

attribute vec2 attPos;
attribute float attSize;
attribute vec2 attUV;

varying vec2 varUV;

void main() {
    varUV = attUV;
    float w = uniScreen.x * uniShrink;
    float h = uniScreen.y;
    gl_PointSize = attSize * w;
    gl_Position = vec4( 
        attPos.x * uniShrink, 
        0.8 + attPos.y * h / w, 1.0, 1.0 
    );
}
