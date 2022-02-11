uniform float uniTime;

attribute vec2 attInitialPosition;
attribute vec2 attInitialSpeed;
attribute float attBirthTime;

varying vec3 varColor;

const vec2 GRAVITY = vec2(0, -1) * 0.0000005;
const vec3 YELLOW = vec3(1.0, 1.0, 0.1);
const vec3 RED = vec3(0.8, 0.0, 0.0);

void main() {
    float t = uniTime - attBirthTime;
    float t2 = t * t;
    gl_Position = vec4(
        t2 * GRAVITY + t * attInitialSpeed + attInitialPosition,
        0.5, 1.0
    );
    gl_PointSize = 128.0 - 0.02 * t;
    float life = clamp(t * 0.005, 0.0, 1.0);
    float light = 11.0 - 10.0 * life * life;
    varColor = light * mix(YELLOW, RED, life);
}