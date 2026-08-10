/**
 * WebSocket Collaborative Whiteboard & System Architecture Diagram Handler
 */

const canvasRooms = new Map();

export const handleWhiteboardEvents = (io, socket) => {
  socket.on('whiteboard:join', ({ roomId }) => {
    socket.join(roomId);
    if (!canvasRooms.has(roomId)) {
      canvasRooms.set(roomId, { nodes: [], connectors: [] });
    }
    socket.emit('whiteboard:init', canvasRooms.get(roomId));
  });

  socket.on('whiteboard:update_node', ({ roomId, node }) => {
    const state = canvasRooms.get(roomId);
    if (state) {
      state.nodes.push(node);
      socket.to(roomId).emit('whiteboard:node_added', node);
    }
  });
};

export default handleWhiteboardEvents;
