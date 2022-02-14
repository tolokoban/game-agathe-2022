/**
 * Cat, mice and other objects can appear in a fixed number of columns.
 * There are only COLUMNS x positions for any of them.
 */
export const COLUMNS = 5

/**
 * The margin is where the walls will be painted.
 * There is a margin at the left and one at the right.
 * MARGIN is the width of such margin, expressed in
 * clipping space.
 * (In clipping space, the screen has a total width of 2.)
 */
export const MARGIN = 0.15

/**
 * Let W be the the width of the corridor (floor without the walls)
 * in pixels.
 * The SPEED is W pixels per msec.
 */
export const SPEED = 0.0004

export const MOUSE_COUNT = 9

export const START_DELTA_TIME = 1000

export const DECREASE_DELTAT_TIME = 5
