import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useCodeSync Custom Hook
 * Manages document vector clock versioning, offline disconnect buffering, and state vector sync upon socket reconnect
 */
export const useCodeSync = (socket, roomId, initialCode = '// Write code solution here\n') => {
  const [code, setCode] = useState(initialCode);
  const [version, setVersion] = useState(0);
  const [isConnected, setIsConnected] = useState(true);
  const offlineBufferRef = useRef([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('code:join_room', { roomId, initialCode });

    const handleInitState = (data) => {
      setCode(data.code);
      setVersion(data.version);
    };

    const handleDeltaApplied = ({ delta, version: newVersion }) => {
      setVersion(newVersion);
      if (delta.fullCode) {
        setCode(delta.fullCode);
      }
    };

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit('code:sync_reconnect', { roomId, lastKnownVersion: version });
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleSyncResponse = ({ currentVersion, fullCode }) => {
      setVersion(currentVersion);
      setCode(fullCode);
    };

    socket.on('code:init_state', handleInitState);
    socket.on('code:delta_applied', handleDeltaApplied);
    socket.on('code:sync_response', handleSyncResponse);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('code:init_state', handleInitState);
      socket.off('code:delta_applied', handleDeltaApplied);
      socket.off('code:sync_response', handleSyncResponse);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [socket, roomId, version]);

  const updateCode = useCallback((newCode) => {
    setCode(newCode);
    if (socket && isConnected) {
      socket.emit('code:update_delta', {
        roomId,
        delta: { fullCode: newCode },
        clientVersion: version
      });
    } else {
      offlineBufferRef.current.push(newCode);
    }
  }, [socket, isConnected, roomId, version]);

  return {
    code,
    updateCode,
    version,
    isConnected
  };
};

export default useCodeSync;
