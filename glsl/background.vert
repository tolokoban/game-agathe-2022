// Time in msec
uniform float uniTime;
// Corridors width per msec
uniform float uniSpeed;
// Corridor width / screen width
uniform float uniShrink;
// Screen width and height
uniform vec2 uniScreen;

// The real position of the corridor
attribute vec2 attPos;
// (0,0), (1,0), (0,1), (1,1)
attribute vec2 attUV;

varying vec2 varUV;

void main() {
    float w = uniScreen.x * uniShrink;
    float h = uniScreen.y;
    varUV = attUV * vec2(1.0, h / w);
    varUV += vec2(0, uniTime * uniSpeed);
    gl_Position = vec4( attPos.x, attPos.y, 1.0, 1.0 );
}
