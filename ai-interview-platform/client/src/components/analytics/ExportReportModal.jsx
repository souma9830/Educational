import React, { useState } from 'react';

export default function ExportReportModal({ isOpen, onClose, reportData }) {
  const [format, setFormat] = useState('json');
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setDownloading(true);
    try {
      const response = await fetch('/api/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, reportData }),
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interview-analytics.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      onClose();
    } catch (err) {
      console.error('Failed to export analytics report:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full text-white shadow-2xl">
        <h3 className="text-lg font-semibold mb-2">Export Candidate Analytics</h3>
        <p className="text-xs text-gray-400 mb-4">Choose a format to download candidate interview evaluation metrics.</p>

        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="exportFormat"
              value="json"
              checked={format === 'json'}
              onChange={() => setFormat('json')}
              className="accent-blue-500"
            />
            JSON Format
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="exportFormat"
              value="csv"
              checked={format === 'csv'}
              onChange={() => setFormat('csv')}
              className="accent-blue-500"
            />
            CSV Spreadsheet
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={downloading}
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50 transition"
          >
            {downloading ? 'Exporting...' : 'Download Report'}
          </button>
        </div>
      </div>
    </div>
  );
}
