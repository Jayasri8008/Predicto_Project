import React, { useState, useEffect } from 'react';
import { Search, Loader, AlertCircle, FileText, User } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const api = useApi();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setStatus('error');
      setMessage('Please enter a search query');
      return;
    }

    try {
      setLoading(true);
      setStatus(null);
      const params = new URLSearchParams({
        q: query,
        type: searchType,
      });
      const response = await api.get(`/search?${params}`);
      setResults(response.data.data || []);
      if (response.data.data?.length === 0) {
        setStatus('info');
        setMessage('No results found');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-100 from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-6 h-6 text-cyan-600 text-cyan-400" />
        <h3 className="text-xl font-bold text-gray-900 text-white">Search</h3>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, users..."
            className="flex-1 px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-800 text-gray-900 text-white"
        >
          <option value="all">All</option>
          <option value="project">Projects</option>
          <option value="user">Users</option>
        </select>
      </form>

      {status === 'error' && (
        <div className="mt-4 flex items-center gap-2 p-3 bg-red-100 bg-red-900/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 text-red-400" />
          <span className="text-red-900 text-red-200">{message}</span>
        </div>
      )}

      {status === 'info' && (
        <div className="mt-4 flex items-center gap-2 p-3 bg-blue-100 bg-blue-900/30 rounded-lg">
          <Search className="w-5 h-5 text-blue-600 text-blue-400" />
          <span className="text-blue-900 text-blue-200">{message}</span>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
          {results.map((result, idx) => (
            <div key={idx} className="p-3 bg-white bg-gray-800 rounded-lg border border-gray-200 border-gray-700">
              <div className="flex items-start gap-3">
                {result.type === 'project' ? (
                  <FileText className="w-5 h-5 text-cyan-600 text-cyan-400 flex-shrink-0 mt-1" />
                ) : (
                  <User className="w-5 h-5 text-cyan-600 text-cyan-400 flex-shrink-0 mt-1" />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 text-white">{result.name}</h4>
                  <p className="text-sm text-gray-600 text-gray-400">{result.description}</p>
                  <span className="text-xs text-gray-500 text-gray-500 capitalize">{result.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
