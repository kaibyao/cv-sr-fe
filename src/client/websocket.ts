/**
 * Why WebSocket and not WebRTC?
 * - WebRTC uses UDP, which is faster than WebSocket’s TCP, but the fact that it doesn't care about packet loss means that brush strokes might not transfer to all connected clients correctly. For an application like Graffiti, it's important that the fidelity of the drawing is preserved.
 * - While we do need perceived realtime for brush strokes, WS is fast enough to achieve that while being more stable. We don't need the extra speed that WebRTC has.
 */

export const ws = new WebSocket("ws://localhost:9001");
