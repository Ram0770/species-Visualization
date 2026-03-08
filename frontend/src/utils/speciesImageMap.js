const speciesImageMap = {
  'Escherichia coli': '/species-images/Escherichia coli.jpeg',
  'Bacillus subtilis': '/species-images/Bacillus subtilis.jpeg',
  'Staphylococcus epidermidis': '/species-images/Staphylococcus epidermidis.jpeg',
  'Pseudomonas fluorescens': '/species-images/Pseudomonas fluorescens.jpeg',
  'Lactobacillus acidophilus': '/species-images/Lactobacillus acidophilus.jpeg',
  'Rhizobium leguminosarum': '/species-images/Rhizobium leguminosarum.jpeg',
  'Azotobacter chroococcum': '/species-images/Azotobacter chroococcum.jpeg',
  'Mycobacterium smegmatis': '/species-images/mycobacterium smegmatis.jpeg',
  'Clostridium sporogenes': '/species-images/Clostridium sporogenes.jpeg',
  'Lactococcus lactis': '/species-images/Lactococcus lactis.jpeg',
  'Micrococcus luteus': '/species-images/Micrococcus luteus.jpeg',
  'Enterobacter aerogenes': '/species-images/Enterobacter aerogenes.jpeg',
  'Proteus vulgaris': '/species-images/Proteus vulgaris.jpeg',
  'Serratia marcescens': '/species-images/Serratia marcescens.jpeg',
  'Klebsiella pneumoniae': '/species-images/Klebsiella pneumoniae.jpeg',
  'Bacillus megaterium': '/species-images/Bacillus megaterium.jpeg',
  'Bacillus cereus': '/species-images/Bacillus cereus.jpeg',
  'Pseudomonas putida': '/species-images/Pseudomonas putida.jpeg',
  'Acetobacter aceti': '/species-images/Acetobacter aceti.jpeg',
  'Nitrosomonas europaea': '/species-images/Nitrosomonas europaea.jpeg',
};

const isSeededRemoteImage = (imageUrl = '') => imageUrl.includes('images.unsplash.com');

export function getSpeciesImageUrl(species) {
  const fallback = speciesImageMap[species?.scientific_name] || '/species-images/Escherichia coli.jpeg';

  if (!species?.image_url) {
    return fallback;
  }

  if (isSeededRemoteImage(species.image_url)) {
    return fallback;
  }

  return species.image_url;
}

export default speciesImageMap;
