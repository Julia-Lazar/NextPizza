'use client';
import { useState } from 'react';

type Props = { onUploaded?: (url: string) => void };

export default function ImageUploaderLocal({ onUploaded }: Props) {
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/uploads/local', {
        method: 'POST',
        body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      setPreview(json.url);
      onUploaded?.(json.url);
    } catch (err: any) {
      setError(err.message || 'Upload error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="cursor-pointer">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading}
        className="block w-full text-sm mb-2 text-orange-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 file:cursor-pointer"
      />
      {isUploading && <p>Uploading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {preview && <img src={preview} alt="preview" style={{ maxWidth: 240 }} />}
    </div>
  );
}
