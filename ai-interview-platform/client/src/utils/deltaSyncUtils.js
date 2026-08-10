/**
 * OT / Vector Clock Reconnection Sync Helper
 */

export const applyMissedDeltas = (currentCode = '', missedDeltas = []) => {
  let updatedCode = currentCode;
  missedDeltas.forEach((d) => {
    if (d.delta?.fullCode) {
      updatedCode = d.delta.fullCode;
    }
  });
  return updatedCode;
};
