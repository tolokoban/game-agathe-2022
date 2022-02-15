attribute vec2 attPos;
attribute vec3 attColor;

varying vec3 varColor;

void main() {
    varColor = attColor;
    gl_Position = vec4( 
        attPos.x, 
        attPos.y, 
        1.0, 1.0 
    );
}