import { useState, useEffect } from 'react';

export function useMediaDevices() {
  const [devices, setDevices] = useState([]);
  const [audioStream, setAudioStream] = useState(null);
  const [streamError, setStreamError] = useState(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const getDevices = async () => {
    try {
      if (navigator.mediaDevices?.enumerateDevices) {
        const list = await navigator.mediaDevices.enumerateDevices();
        setDevices(list);
      }
    } catch (err) {
      console.warn('[Media Devices Hook Warning] Could not enumerate devices:', err.message);
    }
  };

  const acquireAudioStream = async (retryCount = 0) => {
    try {
      setIsReconnecting(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      setAudioStream(stream);
      setStreamError(null);
      setIsReconnecting(false);
      return stream;
    } catch (err) {
      setStreamError(err.message);
      if (retryCount < 2) {
        setTimeout(() => acquireAudioStream(retryCount + 1), 1500);
      } else {
        setIsReconnecting(false);
      }
    }
  };

  useEffect(() => {
    getDevices();
    acquireAudioStream();

    if (navigator.mediaDevices) {
      navigator.mediaDevices.addEventListener('devicechange', getDevices);
    }

    return () => {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.removeEventListener('devicechange', getDevices);
      }
    };
  }, []);

  return { devices, audioStream, streamError, isReconnecting, reconnectStream: acquireAudioStream };
}
