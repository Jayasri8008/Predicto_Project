import React, { useState, useEffect } from 'react';
import { Share2, Copy, Loader, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function SocialSharing() {
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    entityType: 'project',
    entityId: '',
    description: '',
    platform: 'general',
  });
  const api = useApi();

  useEffect(() => {
    fetchShares();
  }, []);

  const fetchShares = async () => {
    try {
      setLoading(true);
      const response = await api.get('/share/my-links');
      setShares(response.data.data || []);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to load shares');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShare = async () => {
    if (!formData.entityId.trim()) {
      setStatus('error');
      setMessage('Please enter entity ID');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/share', formData);
      setShares([...shares, response.data.data]);
      setFormData({ entityType: 'project', entityId: '', description: '', platform: 'general' });
      setShowForm(false);
      setStatus('success');
      setMessage('Share link created!');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to create share');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = (shareUrl) => {
    navigator.clipboard.writeText(shareUrl);
    setStatus('success');
    setMessage('Link copied to clipboard!');
    setTimeout(() => setStatus(null), 2000);
  };

  const handleDeleteShare = async (id) => {
    try {
      await api.delete(`/share/${id}`);
      setShares(shares.filter((s) => s.id !== id));
      setStatus('success');
      setMessage('Share link deleted');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to delete share');
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-100 from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Share2 className="w-6 h-6 text-teal-600 text-teal-400" />
          <h3 className="text-xl font-bold text-gray-900 text-white">Social Sharing</h3>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm"
        >
          {showForm ? 'Cancel' : 'New Share'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white bg-gray-800 p-4 rounded-lg mb-4 space-y-3 border border-gray-200 border-gray-700">
          <input
            type="text"
            placeholder="Entity ID"
            value={formData.entityId}
            onChange={(e) => setFormData({ ...formData, entityId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white"
          />
          <select
            value={formData.entityType}
            onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white"
          >
            <option value="project">Project</option>
            <option value="portfolio">Portfolio</option>
            <option value="service">Service</option>
          </select>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white"
          >
            <option value="general">General</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
          <input
            type="text"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white"
          />
          <button
            onClick={handleCreateShare}
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            Create Link
          </button>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center gap-2 p-3 bg-green-100 bg-green-900/30 rounded-lg mb-4">
          <CheckCircle className="w-5 h-5 text-green-600 text-green-400" />
          <span className="text-green-900 text-green-200">{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-100 bg-red-900/30 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 text-red-600 text-red-400" />
          <span className="text-red-900 text-red-200">{message}</span>
        </div>
      )}

      {loading && shares.length === 0 && (
        <div className="flex items-center justify-center p-8">
          <Loader className="w-6 h-6 animate-spin text-teal-600 text-teal-400" />
        </div>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {shares.map((share) => (
          <div
            key={share.id}
            className="p-3 bg-white bg-gray-800 rounded-lg border border-gray-200 border-gray-700"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 text-white truncate">
                  {share.description || `${share.entityType} #${share.entityId}`}
                </p>
                <p className="text-xs text-gray-600 text-gray-400 truncate">{share.shareUrl}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-1 bg-gray-200 bg-gray-700 rounded capitalize">
                    {share.platform}
                  </span>
                  <span className="text-xs text-gray-500">👁 {share.viewCount || 0}</span>
                  <span className="text-xs text-gray-500">🔗 {share.clickCount || 0}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCopyLink(share.shareUrl)}
                  className="p-1 hover:bg-gray-200 hover:bg-gray-700 rounded"
                >
                  <Copy className="w-4 h-4 text-teal-600 text-teal-400" />
                </button>
                <button
                  onClick={() => handleDeleteShare(share.id)}
                  className="p-1 hover:bg-gray-200 hover:bg-gray-700 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-600 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {shares.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-600 text-gray-400">
          No share links created yet
        </div>
      )}
    </div>
  );
}
