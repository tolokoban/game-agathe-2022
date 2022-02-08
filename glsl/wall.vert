uniform float uniTime;
// Texture tiles per msec
uniform float uniSpeed;
// uniShrink = 1.0 - MARGIN
uniform float uniShrink;
// Screen width and height
uniform vec2 uniScreen;

attribute vec2 attPos;
attribute vec2 attUV;

varying vec2 varUV;

void main() {
    float w = uniScreen.x;
    float h = uniScreen.y;
    float scaleV = h / (w * uniShrink);
    varUV = vec2(
        attUV.x,
        attUV.y * scaleV + uniTime * uniSpeed
    );
    gl_Position = vec4( attPos.x, attPos.y, 1.0, 1.0 );
}
