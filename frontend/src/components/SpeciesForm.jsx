import { useState } from 'react';
import { uploadSpeciesImage } from '../services/speciesService';

function SpeciesForm({ initialValues, onSubmit, submitText }) {
  const [form, setForm] = useState(initialValues);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const onChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleImageUpload = async (file) => {
    if (!file) return;
    try {
      setUploading(true);
      const { data } = await uploadSpeciesImage(file);
      onChange('imageUrl', data.imageUrl);
      setMessage('Image uploaded successfully');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    await onSubmit(form, setMessage);
  };

  return (
    <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Species Image</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0])} className="w-full" />
        {uploading && <p className="mt-2 text-xs text-slate-500">Uploading...</p>}
        {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="mt-3 h-40 w-full rounded-xl object-cover" />}
      </div>

      <input
        value={form.scientificName}
        onChange={(e) => onChange('scientificName', e.target.value)}
        placeholder="Scientific Name"
        className="w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3"
        required
      />
      <textarea
        value={form.description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Description"
        className="h-28 w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3"
        required
      />
      <textarea
        value={form.protocol}
        onChange={(e) => onChange('protocol', e.target.value)}
        placeholder="Species Protocol (step-by-step laboratory preparation)"
        className="h-48 w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3"
        required
      />
      <input
        type="number"
        value={form.yearFound}
        onChange={(e) => onChange('yearFound', e.target.value)}
        placeholder="Year Found"
        className="w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3"
        required
      />
      <input
        value={form.scientistName}
        onChange={(e) => onChange('scientistName', e.target.value)}
        placeholder="Scientist Name"
        className="w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3"
        required
      />
      <input
        value={form.habitat}
        onChange={(e) => onChange('habitat', e.target.value)}
        placeholder="Habitat"
        className="w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3"
        required
      />
      <input
        value={form.classification}
        onChange={(e) => onChange('classification', e.target.value)}
        placeholder="Classification"
        className="w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3"
        required
      />

      {message && <p className="text-sm text-slate-600">{message}</p>}

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-sky to-mint px-5 py-3 font-semibold text-white shadow-lg shadow-sky-200"
      >
        {submitText}
      </button>
    </form>
  );
}

export default SpeciesForm;
