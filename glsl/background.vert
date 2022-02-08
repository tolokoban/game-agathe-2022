uniform float uniTime;
uniform float uniSpeed;
uniform float uniShrink;
// Screen width and height.
uniform vec2 uniScreen;

attribute vec2 attPos;
attribute vec2 attUV;

varying vec2 varUV;

void main() {
    float w = uniScreen.x;
    float h = uniScreen.y;
    float scaleV = h / (w * uniShrink);
    varUV = attUV * vec2(scaleV, 1.0)
        - vec2(uniTime * uniSpeed, 0.0);
    gl_Position = vec4( attPos.x, attPos.y, 1.0, 1.0 );
}
