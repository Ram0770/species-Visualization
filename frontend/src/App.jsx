import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SpeciesDetail from './pages/SpeciesDetail';
import AddSpecies from './pages/AddSpecies';
import EditSpecies from './pages/EditSpecies';
import StatisticsDashboard from './pages/StatisticsDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
        <Route path="/statistics" element={<StatisticsDashboard />} />
      </Route>

      <Route element={<ProtectedRoute roles={['lecturer']} />}>
        <Route path="/species/add" element={<AddSpecies />} />
        <Route path="/species/edit" element={<EditSpecies />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
