const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const BACKUPS_DIR = path.join(__dirname, '../backups');

exports.rotateBackups = (maxBackups = 5, maxAgeDays = 30) => {
  if (!fs.existsSync(BACKUPS_DIR)) {
    return { success: true, message: 'Backups directory does not exist' };
  }

  try {
    const now = Date.now();
    const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;

    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(BACKUPS_DIR, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          path: filePath,
          time: stats.mtime.getTime(),
          size: stats.size
        };
      })
      .sort((a, b) => b.time - a.time);

    const staleFiles = files.filter(f => (now - f.time) > maxAgeMs);
    const countExceededFiles = files.slice(maxBackups);

    const filesToDeleteMap = new Map();
    [...staleFiles, ...countExceededFiles].forEach(f => filesToDeleteMap.set(f.path, f));
    const filesToDelete = Array.from(filesToDeleteMap.values());

    if (filesToDelete.length === 0) {
      return { success: true, message: 'No backup rotation required', deletedCount: 0, freedBytes: 0 };
    }

    let freedBytes = 0;
    filesToDelete.forEach(file => {
      freedBytes += file.size;
      fs.unlinkSync(file.path);
      logger.info(`[Backup Rotation] Pruned old backup archive: ${file.name}`, { freedBytes: file.size });
    });

    return {
      success: true,
      message: `Rotated backups. Deleted ${filesToDelete.length} stale/exceeded files.`,
      deletedCount: filesToDelete.length,
      freedBytes
    };
  } catch (error) {
    logger.error('[Backup Rotation] Error during retention check:', { error: error.message });
    throw error;
  }
};
