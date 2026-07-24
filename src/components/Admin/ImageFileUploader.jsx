import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, Check, Loader2 } from 'lucide-react';
import { uploadImageFile } from '../../lib/supabaseClient';

export default function ImageFileUploader({ value, onChange, label = 'Product Image' }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        onChange(url);
      }
    } catch (err) {
      console.error('File upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-montserrat font-bold text-xs text-[#3d0006] uppercase tracking-wider">
        {label}
      </label>

      {value ? (
        /* Image Preview Box */
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-[#735c00] bg-[#f6f3f2] group shadow-inner">
          <img
            src={value}
            alt="Uploaded Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="px-4 py-2 bg-[#fed65b] text-[#3d0006] font-montserrat font-bold text-xs rounded-full cursor-pointer hover:bg-white transition-colors shadow">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <span className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/60 text-white text-[10px] rounded-full font-montserrat flex items-center gap-1">
            <Check className="w-3 h-3 text-green-400" /> Image Selected
          </span>
        </div>
      ) : (
        /* Drag & Drop File Input Area */
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-44 rounded-2xl border-2 border-dashed transition-all cursor-pointer p-6 text-center ${
            dragActive
              ? 'border-[#735c00] bg-[#fed65b]/20 scale-[1.01]'
              : 'border-[#dbc0bf] bg-white hover:border-[#735c00] hover:bg-[#f0eded]'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-[#735c00]">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="font-montserrat font-bold text-xs">Uploading image file...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#554241]">
              <div className="w-12 h-12 rounded-full bg-[#f0eded] text-[#3d0006] flex items-center justify-center shadow-sm">
                <UploadCloud className="w-6 h-6 text-[#735c00]" />
              </div>
              <div>
                <span className="font-montserrat font-bold text-xs text-[#3d0006] block">
                  Click to select an image from your computer
                </span>
                <span className="font-hanken text-[11px] text-[#887271]">
                  PNG, JPG, WEBP, or GIF supported (drag & drop supported)
                </span>
              </div>
            </div>
          )}
        </label>
      )}
    </div>
  );
}
