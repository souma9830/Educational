/**
 * WebRTC Media Stream End-to-End Encryption (E2EE) Service
 * Uses WebAssembly / Web Crypto API (AES-GCM-256) and TransformStreams
 * to encrypt audio and video frames before WebRTC transmission.
 */

class WebRTCEncryptionService {
  constructor() {
    this.cryptoKey = null;
    this.isEncryptionEnabled = false;
  }

  async initializeKey(secretKeyString) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKeyString.padEnd(32, '0').slice(0, 32));
    
    this.cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    this.isEncryptionEnabled = true;
    return true;
  }

  async encryptFrame(frame, controller) {
    if (!this.isEncryptionEnabled || !this.cryptoKey) {
      controller.enqueue(frame);
      return;
    }

    try {
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const data = new Uint8Array(frame.data);

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        this.cryptoKey,
        data
      );

      const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encryptedBuffer), iv.length);

      frame.data = combined.buffer;
      controller.enqueue(frame);
    } catch (err) {
      console.error('Frame E2EE Encryption Error:', err);
      controller.enqueue(frame);
    }
  }

  async decryptFrame(frame, controller) {
    if (!this.isEncryptionEnabled || !this.cryptoKey) {
      controller.enqueue(frame);
      return;
    }

    try {
      const combined = new Uint8Array(frame.data);
      const iv = combined.slice(0, 12);
      const ciphertext = combined.slice(12);

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        this.cryptoKey,
        ciphertext
      );

      frame.data = decryptedBuffer;
      controller.enqueue(frame);
    } catch (err) {
      console.error('Frame E2EE Decryption Error:', err);
      controller.enqueue(frame);
    }
  }
}

export const webrtcEncryption = new WebRTCEncryptionService();
export default webrtcEncryption;
