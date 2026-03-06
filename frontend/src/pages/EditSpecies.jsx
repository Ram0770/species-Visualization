import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SpeciesForm from '../components/SpeciesForm';
import { deleteSpecies, getSpecies, updateSpecies } from '../services/speciesService';

const blank = {
  imageUrl: '',
  scientificName: '',
  description: '',
  protocol: '',
  yearFound: '',
  scientistName: '',
  habitat: '',
  classification: '',
};

function EditSpecies() {
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await getSpecies('');
      setSpeciesList(data.data);
      if (data.data.length) setSelectedId(String(data.data[0].id));
    };

    load();
  }, []);

  const selected = speciesList.find((item) => String(item.id) === String(selectedId));

  const selectedForm = selected
    ? {
        imageUrl: selected.image_url || '',
        scientificName: selected.scientific_name,
        description: selected.description,
        protocol: selected.protocol || '',
        yearFound: selected.year_found,
        scientistName: selected.scientist_name,
        habitat: selected.habitat,
        classification: selected.classification,
      }
    : blank;

  const handleUpdate = async (form, setMessage) => {
    if (!selected) return;
    try {
      await updateSpecies(selected.id, form);
      const { data } = await getSpecies('');
      setSpeciesList(data.data);
      setMessage('Species updated successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    await deleteSpecies(selected.id);
    const { data } = await getSpecies('');
    setSpeciesList(data.data);
    setSelectedId(data.data[0] ? String(data.data[0].id) : '');
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-6">
      <Navbar />
      <h1 className="mb-4 font-['Sora'] text-2xl font-bold">Edit Species</h1>

      <div className="glass mb-5 rounded-2xl p-4">
        <label className="mb-2 block text-sm font-semibold text-slate-700">Select Species</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3"
        >
          {speciesList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.scientific_name}
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <>
          <SpeciesForm key={selected.id} initialValues={selectedForm} onSubmit={handleUpdate} submitText="Update Species" />
          <button
            type="button"
            onClick={handleDelete}
            className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Delete Species
          </button>
        </>
      )}
    </main>
  );
}

export default EditSpecies;
