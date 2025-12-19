import React, { useState, useEffect } from 'react';
import { Command, Loader, AlertCircle, CheckCircle, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function KeyboardShortcuts() {
  const [shortcuts, setShortcuts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    keys: '',
    action: '',
    description: '',
  });
  const api = useApi();

  useEffect(() => {
    fetchShortcuts();
  }, []);

  const fetchShortcuts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/shortcuts');
      setShortcuts(response.data.data || []);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to load shortcuts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShortcut = async () => {
    if (!formData.name || !formData.keys || !formData.action) {
      setStatus('error');
      setMessage('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/shortcuts', formData);
      setShortcuts([...shortcuts, response.data.data]);
      setFormData({ name: '', keys: '', action: '', description: '' });
      setShowForm(false);
      setStatus('success');
      setMessage('Shortcut created!');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to create shortcut');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShortcut = async (id) => {
    try {
      await api.delete(`/shortcuts/${id}`);
      setShortcuts(shortcuts.filter((s) => s.id !== id));
      setStatus('success');
      setMessage('Shortcut deleted');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to delete shortcut');
    }
  };

  const handleReorderShortcuts = async (newOrder) => {
    try {
      await api.post('/shortcuts/reorder', { shortcuts: newOrder });
      setShortcuts(newOrder);
      setStatus('success');
      setMessage('Shortcuts reordered!');
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to reorder shortcuts');
    }
  };

  const moveShortcut = (index, direction) => {
    const newShortcuts = [...shortcuts];
    if (direction === 'up' && index > 0) {
      [newShortcuts[index], newShortcuts[index - 1]] = [newShortcuts[index - 1], newShortcuts[index]];
      handleReorderShortcuts(newShortcuts);
    } else if (direction === 'down' && index < shortcuts.length - 1) {
      [newShortcuts[index], newShortcuts[index + 1]] = [newShortcuts[index + 1], newShortcuts[index]];
      handleReorderShortcuts(newShortcuts);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Command className="w-6 h-6 text-indigo-600 text-indigo-400" />
          <h3 className="text-xl font-bold text-gray-900 text-white">Keyboard Shortcuts</h3>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
        >
          {showForm ? 'Cancel' : 'Add Shortcut'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white bg-gray-800 p-4 rounded-lg mb-4 space-y-3 border border-gray-200 border-gray-700">
          <input
            type="text"
            placeholder="Shortcut name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white"
          />
          <input
            type="text"
            placeholder="Keys (e.g., Ctrl+N)"
            value={formData.keys}
            onChange={(e) => setFormData({ ...formData, keys: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white"
          />
          <input
            type="text"
            placeholder="Action"
            value={formData.action}
            onChange={(e) => setFormData({ ...formData, action: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white"
          />
          <button
            onClick={handleCreateShortcut}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Command className="w-4 h-4" />}
            Create Shortcut
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

      {loading && shortcuts.length === 0 && (
        <div className="flex items-center justify-center p-8">
          <Loader className="w-6 h-6 animate-spin text-indigo-600 text-indigo-400" />
        </div>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {shortcuts.map((shortcut, index) => (
          <div
            key={shortcut.id}
            className="p-3 bg-white bg-gray-800 rounded-lg border border-gray-200 border-gray-700"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-white">{shortcut.name}</p>
                <div className="flex gap-2 mt-1">
                  <code className="text-xs bg-gray-200 bg-gray-700 px-2 py-1 rounded text-gray-900 text-white">
                    {shortcut.keys}
                  </code>
                  <span className="text-xs text-gray-600 text-gray-400">→ {shortcut.action}</span>
                  {shortcut.isCustom && (
                    <span className="text-xs px-2 py-1 bg-indigo-200 bg-indigo-900/30 rounded text-indigo-900 text-indigo-200">
                      Custom
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => moveShortcut(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-200 hover:bg-gray-700 rounded disabled:opacity-50"
                >
                  <ArrowUp className="w-4 h-4 text-gray-600 text-gray-400" />
                </button>
                <button
                  onClick={() => moveShortcut(index, 'down')}
                  disabled={index === shortcuts.length - 1}
                  className="p-1 hover:bg-gray-200 hover:bg-gray-700 rounded disabled:opacity-50"
                >
                  <ArrowDown className="w-4 h-4 text-gray-600 text-gray-400" />
                </button>
                {shortcut.isCustom && (
                  <button
                    onClick={() => handleDeleteShortcut(shortcut.id)}
                    className="p-1 hover:bg-gray-200 hover:bg-gray-700 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 text-red-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {shortcuts.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-600 text-gray-400">
          No shortcuts configured
        </div>
      )}
    </div>
  );
}
