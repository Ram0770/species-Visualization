import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SpeciesForm from '../components/SpeciesForm';
import { createSpecies } from '../services/speciesService';

const initialValues = {
  imageUrl: '',
  scientificName: '',
  description: '',
  protocol: '',
  yearFound: '',
  scientistName: '',
  habitat: '',
  classification: '',
};

function AddSpecies() {
  const navigate = useNavigate();

  const handleSubmit = async (form, setMessage) => {
    try {
      await createSpecies(form);
      setMessage('Species added successfully. Redirecting...');
      setTimeout(() => navigate('/dashboard'), 900);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add species');
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-6">
      <Navbar />
      <section className="mb-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass rounded-[32px] p-6">
          <p className="section-kicker mb-3">Lecturer Workflow</p>
          <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">Add a new species record with stronger visual and scientific structure.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
            This page now behaves more like a curated editorial workspace: image, protocol, and metadata all feel like part of one designed entry system.
          </p>
        </div>
        <div className="ink-panel rounded-[32px] p-6 text-white">
          <div className="relative z-10">
            <p className="section-kicker mb-3 text-white/50">Best Practice</p>
            <p className="text-lg font-semibold">Add the image first, then complete the description and protocol in full sentences.</p>
            <p className="mt-3 text-sm leading-7 text-white/68">
              That sequence gives you a cleaner preview flow and makes the final entry feel much more complete when students view it later.
            </p>
          </div>
        </div>
      </section>
      <SpeciesForm initialValues={initialValues} onSubmit={handleSubmit} submitText="Save Species" />
    </main>
  );
}

export default AddSpecies;
