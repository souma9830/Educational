export function stopMediaStream(stream) {
  if (!stream) return;
  try {
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
      stream.removeTrack(track);
    });
  } catch (err) {
    console.warn('[MediaCleaner] Error stopping media tracks:', err);
  }
}
