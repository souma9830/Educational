import React, { useState } from 'react';
import { exportToCSV, exportToJSON } from '../../utils/analyticsExporter';

export default function ReportExportModal({ isOpen, onClose, reportData }) {
  const [format, setFormat] = useState('csv');

  if (!isOpen) return null;

  const handleDownload = () => {
    let content = '';
    let mimeType = 'text/plain';
    let ext = 'txt';

    if (format === 'csv') {
      content = exportToCSV(reportData || {});
      mimeType = 'text/csv';
      ext = 'csv';
    } else {
      content = exportToJSON(reportData || {});
      mimeType = 'application/json';
      ext = 'json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `interview_assessment_report.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-slate-100">
        <h3 className="text-lg font-bold">Export Assessment Report</h3>
        <p className="text-xs text-slate-400">Choose your preferred export file format:</p>

        <div className="space-y-2">
          <label className="flex items-center space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
            <input
              type="radio"
              name="format"
              value="csv"
              checked={format === 'csv'}
              onChange={() => setFormat('csv')}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium">CSV Spreadsheet (.csv)</span>
          </label>
          <label className="flex items-center space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
            <input
              type="radio"
              name="format"
              value="json"
              checked={format === 'json'}
              onChange={() => setFormat('json')}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium">Raw JSON Data (.json)</span>
          </label>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={onClose}
            className="w-1/2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="w-1/2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}