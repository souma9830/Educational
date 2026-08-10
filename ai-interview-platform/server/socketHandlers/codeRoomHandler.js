/**
 * Collaborative Code Editor Socket Handler with OT State Vector Reconnection Catch-Up
 */

const codeRooms = new Map();

export const handleCodeRoomEvents = (io, socket) => {
  // Join coding assessment room
  socket.on('code:join_room', ({ roomId, initialCode = '// Write technical solution here\n' }) => {
    socket.join(roomId);

    if (!codeRooms.has(roomId)) {
      codeRooms.set(roomId, {
        code: initialCode,
        version: 0,
        pendingDeltas: []
      });
    }

    const roomState = codeRooms.get(roomId);
    socket.emit('code:init_state', {
      code: roomState.code,
      version: roomState.version
    });
  });

  // Handle client code delta update
  socket.on('code:update_delta', ({ roomId, delta, clientVersion }) => {
    const roomState = codeRooms.get(roomId);
    if (!roomState) return;

    roomState.version += 1;
    roomState.code = delta.fullCode || roomState.code;
    roomState.pendingDeltas.push({ version: roomState.version, delta, timestamp: Date.now() });

    // Keep last 100 deltas for fast catch-up
    if (roomState.pendingDeltas.length > 100) {
      roomState.pendingDeltas.shift();
    }

    socket.to(roomId).emit('code:delta_applied', {
      delta,
      version: roomState.version,
      senderId: socket.id
    });
  });

  // Reconnection state vector sync request
  socket.on('code:sync_reconnect', ({ roomId, lastKnownVersion }) => {
    const roomState = codeRooms.get(roomId);
    if (!roomState) return;

    const missedDeltas = roomState.pendingDeltas.filter(d => d.version > lastKnownVersion);

    socket.emit('code:sync_response', {
      currentVersion: roomState.version,
      fullCode: roomState.code,
      missedDeltas
    });
  });
};

export default handleCodeRoomEvents;
