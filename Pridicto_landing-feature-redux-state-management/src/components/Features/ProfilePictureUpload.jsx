import React, { useState, useRef } from 'react';
import { Upload, Image, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function ProfilePictureUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const api = useApi();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setStatus('error');
      setMessage('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setStatus('error');
      setMessage('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
    setStatus(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('error');
      setMessage('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/user/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus('success');
      setMessage('Profile picture uploaded successfully!');
      setFile(null);
      setPreview(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to upload profile picture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Image className="w-6 h-6 text-amber-600 text-amber-400" />
        <h3 className="text-xl font-bold text-gray-900 text-white">Profile Picture</h3>
      </div>

      <div className="space-y-4">
        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-amber-300 border-amber-600"
            />
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-300 border-amber-600 rounded-lg p-6 text-center cursor-pointer hover:bg-amber-100 hover:bg-gray-800 transition"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="w-8 h-8 mx-auto mb-2 text-amber-600 text-amber-400" />
          <p className="text-gray-900 text-white font-semibold">Click to upload image</p>
          <p className="text-sm text-gray-700 text-gray-300">Max size: 5MB</p>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          Upload Picture
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
