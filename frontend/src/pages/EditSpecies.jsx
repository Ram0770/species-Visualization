import { useEffect, useState } from 'react';
import CustomSelect from '../components/CustomSelect';
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

  const speciesOptions = speciesList.map((item) => ({
    value: String(item.id),
    label: item.scientific_name,
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-6">
      <Navbar />
      <section className="mb-6 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="glass rounded-[32px] p-6">
          <p className="section-kicker mb-3">Lecturer Editor</p>
          <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">Edit species records in a workspace built for curation, not just data entry.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
            Choose a species, refine the image and scientific information, then update the record with a single controlled save action.
          </p>
        </div>
        <div className="glass rounded-[32px] p-6">
          <label className="section-kicker mb-3 block">Select species</label>
          <CustomSelect
            value={selectedId}
            options={speciesOptions}
            onChange={setSelectedId}
            placeholder="Choose a species"
          />
        </div>
      </section>

      {selected && (
        <>
          <SpeciesForm key={selected.id} initialValues={selectedForm} onSubmit={handleUpdate} submitText="Update Species" />
          <button
            type="button"
            onClick={handleDelete}
            className="mt-5 rounded-[22px] bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(225,29,72,0.18)] transition hover:bg-rose-700"
          >
            Delete Species
          </button>
        </>
      )}
    </main>
  );
}

export default EditSpecies;
