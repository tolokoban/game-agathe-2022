uniform float uniTime;
// Texture tiles per msec
uniform float uniSpeed;
// uniShrink = 1.0 - MARGIN
uniform float uniShrink;
// Screen width and height
uniform vec2 uniScreen;

// x, y, W
attribute vec3 attPos;
attribute vec2 attUV;

varying vec2 varUV;

void main() {
    float width = uniScreen.x * (1.0 - uniShrink);
    float height = uniScreen.y;
    varUV = attUV * vec2(height / width, 0.5);
    varUV.x -= uniTime * uniSpeed;
    float x = attPos.x;
    float y = attPos.y;
    float w = attPos.z;
    gl_Position = vec4( x, y, 1.0, w );
}