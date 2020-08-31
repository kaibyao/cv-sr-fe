/**
 * Canvas drawing functions
 */

/**
 * Initiates the start of a new canvas path/line.
 *
 * @param ctx
 * @param x
 * @param y
 */
export function newStroke(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
): void {
  ctx.moveTo(x, y);
  ctx.lineCap = "round"; // smooth lines
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#4bd1c4";
  ctx.beginPath();
}

/**
 * Draws a line onto the canvas context.
 *
 * @param ctx
 * @param x
 * @param y
 */
export function draw(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
): void {
  ctx.lineTo(x, y);
  ctx.stroke();
}

/**
 * Clears the board.
 *
 * @param ctx
 * @param width
 * @param height
 */
export function clear(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  ctx.clearRect(0, 0, width, height);
}
