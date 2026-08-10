import DiagramState from '../models/DiagramState.js';

/**
 * Real-Time Collaborative Whiteboard & System Architecture Diagram WebSocket Handler
 */

const canvasRooms = new Map();

export const handleWhiteboardEvents = (io, socket) => {
  // Join diagramming session
  socket.on('whiteboard:join_room', async ({ roomId, candidateId, interviewerId }) => {
    socket.join(roomId);

    if (!canvasRooms.has(roomId)) {
      let savedState = await DiagramState.findOne({ interviewId: roomId });
      if (!savedState) {
        savedState = await DiagramState.create({
          interviewId: roomId,
          nodes: [
            { id: 'n-1', type: 'Load Balancer', label: 'NGINX Ingress', x: 60, y: 100 },
            { id: 'n-2', type: 'API Gateway', label: 'Kong Gateway', x: 240, y: 100 },
            { id: 'n-3', type: 'Redis Cache', label: 'Redis Cluster', x: 440, y: 40 },
            { id: 'n-4', type: 'PostgreSQL DB', label: 'Primary DB', x: 440, y: 160 }
          ],
          connectors: [
            { id: 'c-1', fromNodeId: 'n-1', toNodeId: 'n-2', label: 'HTTP/2' },
            { id: 'c-2', fromNodeId: 'n-2', toNodeId: 'n-3', label: 'Cache Lookup' },
            { id: 'c-3', fromNodeId: 'n-2', toNodeId: 'n-4', label: 'SQL Read/Write' }
          ]
        });
      }

      canvasRooms.set(roomId, {
        nodes: savedState.nodes,
        connectors: savedState.connectors,
        version: savedState.version
      });
    }

    const state = canvasRooms.get(roomId);
    socket.emit('whiteboard:init_state', state);
  });

  // Handle node position update delta
  socket.on('whiteboard:update_node_position', async ({ roomId, nodeId, x, y }) => {
    const state = canvasRooms.get(roomId);
    if (!state) return;

    const node = state.nodes.find(n => n.id === nodeId);
    if (node) {
      node.x = x;
      node.y = y;
      state.version += 1;

      socket.to(roomId).emit('whiteboard:node_moved', { nodeId, x, y, version: state.version });
    }
  });

  // Add architectural node
  socket.on('whiteboard:add_node', ({ roomId, node }) => {
    const state = canvasRooms.get(roomId);
    if (!state) return;

    state.nodes.push(node);
    state.version += 1;

    socket.to(roomId).emit('whiteboard:node_added', { node, version: state.version });
  });

  // Add connecting arrow vector
  socket.on('whiteboard:add_connector', ({ roomId, connector }) => {
    const state = canvasRooms.get(roomId);
    if (!state) return;

    state.connectors.push(connector);
    state.version += 1;

    socket.to(roomId).emit('whiteboard:connector_added', { connector, version: state.version });
  });

  // Clear diagram canvas
  socket.on('whiteboard:clear_canvas', ({ roomId }) => {
    const state = canvasRooms.get(roomId);
    if (!state) return;

    state.nodes = [];
    state.connectors = [];
    state.version += 1;

    socket.to(roomId).emit('whiteboard:canvas_cleared', { version: state.version });
  });
};

export default handleWhiteboardEvents;
