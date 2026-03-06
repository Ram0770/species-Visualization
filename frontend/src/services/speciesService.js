import api from './api';

export const getSpecies = (search = '') => api.get('/species', { params: { search } });
export const getSpeciesById = (id) => api.get(`/species/${id}`);
export const createSpecies = (payload) => api.post('/species', payload);
export const updateSpecies = (id, payload) => api.put(`/species/${id}`, payload);
export const deleteSpecies = (id) => api.delete(`/species/${id}`);
export const uploadSpeciesImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/species/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const getSpeciesStats = () => api.get('/species/stats/overview');
