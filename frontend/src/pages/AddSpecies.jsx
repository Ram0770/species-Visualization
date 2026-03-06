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
    <main className="mx-auto max-w-3xl px-6 py-6">
      <Navbar />
      <h1 className="mb-4 font-['Sora'] text-2xl font-bold">Add Species</h1>
      <SpeciesForm initialValues={initialValues} onSubmit={handleSubmit} submitText="Save Species" />
    </main>
  );
}

export default AddSpecies;
