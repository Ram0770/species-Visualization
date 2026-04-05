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
    <form onSubmit={handleSubmit} className="glass page-enter rounded-[34px] p-6 md:p-8">
      <div className="mb-6 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/55 p-5">
          <p className="section-kicker mb-2">Visual Asset</p>
          <h2 className="text-2xl font-bold text-slate-950">Species image</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Upload a high-quality image that clearly supports recognition and matches the academic tone of the platform.
          </p>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-white/75 px-6 py-8 text-center transition hover:bg-white">
            <div className="mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-sky/15 to-mint/15" />
            <span className="text-base font-semibold text-slate-900">Choose image</span>
            <span className="mt-1 text-sm text-slate-500">PNG, JPG, or WEBP</span>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0])} className="hidden" />
          </label>

          {uploading && <p className="mt-3 text-sm text-slate-500">Uploading image...</p>}
          {message && <p className="mt-3 rounded-2xl bg-slate-900/5 px-4 py-3 text-sm text-slate-600">{message}</p>}
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/60 bg-slate-950">
          {form.imageUrl ? (
            <img src={form.imageUrl} alt="Preview" className="h-full min-h-[320px] w-full object-cover" />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(86,199,255,0.22),transparent_35%),linear-gradient(160deg,rgba(10,19,34,0.98),rgba(17,30,51,0.96))] p-8 text-center text-white/70">
              <div>
                <p className="text-lg font-semibold text-white">Image preview</p>
                <p className="mt-2 max-w-xs text-sm leading-7 text-white/60">Your uploaded species image will appear here before the record is saved.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="field-shell rounded-[24px] px-4 py-3 md:col-span-2">
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Scientific name</label>
          <input
            value={form.scientificName}
            onChange={(e) => onChange('scientificName', e.target.value)}
            placeholder="Enter scientific name"
            className="field-input"
            required
          />
        </div>

        <div className="field-shell rounded-[24px] px-4 py-3 md:col-span-2">
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Write the species description"
            className="field-input min-h-32 resize-none"
            required
          />
        </div>

        <div className="field-shell rounded-[24px] px-4 py-3 md:col-span-2">
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Species protocol</label>
          <textarea
            value={form.protocol}
            onChange={(e) => onChange('protocol', e.target.value)}
            placeholder="Add the protocol in a clear, step-by-step format"
            className="field-input min-h-52 resize-none"
            required
          />
        </div>

        <div className="field-shell rounded-[24px] px-4 py-3">
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Year found</label>
          <input
            type="number"
            value={form.yearFound}
            onChange={(e) => onChange('yearFound', e.target.value)}
            placeholder="Enter year"
            className="field-input"
            required
          />
        </div>

        <div className="field-shell rounded-[24px] px-4 py-3">
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Scientist name</label>
          <input
            value={form.scientistName}
            onChange={(e) => onChange('scientistName', e.target.value)}
            placeholder="Enter scientist name"
            className="field-input"
            required
          />
        </div>

        <div className="field-shell rounded-[24px] px-4 py-3">
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Habitat</label>
          <input
            value={form.habitat}
            onChange={(e) => onChange('habitat', e.target.value)}
            placeholder="Enter habitat"
            className="field-input"
            required
          />
        </div>

        <div className="field-shell rounded-[24px] px-4 py-3">
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Classification</label>
          <input
            value={form.classification}
            onChange={(e) => onChange('classification', e.target.value)}
            placeholder="Enter classification"
            className="field-input"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-[24px] bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 px-5 py-4 text-base font-semibold text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] transition hover:translate-y-[-1px]"
      >
        {submitText}
      </button>
    </form>
  );
}

export default SpeciesForm;
