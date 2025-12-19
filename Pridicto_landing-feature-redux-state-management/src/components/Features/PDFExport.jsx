import React, { useState } from 'react';
import { FileText, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function PDFExport() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [exportType, setExportType] = useState('single');
  const [projectId, setProjectId] = useState('');
  const api = useApi();

  const handleExportSingle = async () => {
    if (!projectId.trim()) {
      setStatus('error');
      setMessage('Please enter a project ID');
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/export/project/${projectId}/pdf`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `project-${projectId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      setStatus('success');
      setMessage('PDF exported successfully!');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to export PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleExportBatch = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        '/export/projects/pdf',
        {},
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `projects-export-${new Date().getTime()}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      setStatus('success');
      setMessage('Projects PDF exported successfully!');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to export PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-100 from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-red-600 text-red-400" />
        <h3 className="text-xl font-bold text-gray-900 text-white">PDF Export</h3>
      </div>

      <div className="space-y-4">
        <select
          value={exportType}
          onChange={(e) => setExportType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
        >
          <option value="single">Single Project</option>
          <option value="batch">All Projects</option>
        </select>

        {exportType === 'single' && (
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Enter project ID"
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
          />
        )}

        <button
          onClick={exportType === 'single' ? handleExportSingle : handleExportBatch}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
          Export to PDF
        </button>

        {status === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-100 bg-green-900/30 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 text-green-400" />
            <span className="text-green-900 text-green-200">{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-100 bg-red-900/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 text-red-400" />
            <span className="text-red-900 text-red-200">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
