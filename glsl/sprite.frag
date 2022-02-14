precision mediump float;

// Atlas of 8x8 sprites.
uniform sampler2D uniTexture;

// Size of a a side of a square tile in the sprites' atlas.
const float TILE = 1.0 / 4.0;

varying vec2 varUV;

void main() {
  gl_FragColor = texture2D( uniTexture, varUV + TILE * gl_PointCoord );
}
