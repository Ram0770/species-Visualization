CREATE DATABASE IF NOT EXISTS speciesvision;
USE speciesvision;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  role ENUM('student', 'lecturer') NOT NULL,
  password_hash VARCHAR(255) NULL,
  google_id VARCHAR(255) NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email),
  INDEX idx_users_role (role)
);

CREATE TABLE IF NOT EXISTS species (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(500) NULL,
  scientific_name VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  protocol MEDIUMTEXT NULL,
  year_found INT NOT NULL,
  scientist_name VARCHAR(180) NOT NULL,
  habitat VARCHAR(255) NOT NULL,
  classification VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_scientific_name (scientific_name),
  INDEX idx_species_scientific_name (scientific_name),
  INDEX idx_species_scientist_name (scientist_name),
  INDEX idx_species_year_found (year_found)
);

SET @has_protocol := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'species'
    AND COLUMN_NAME = 'protocol'
);
SET @alter_protocol_sql := IF(
  @has_protocol = 0,
  'ALTER TABLE species ADD COLUMN protocol MEDIUMTEXT NULL',
  'SELECT 1'
);
PREPARE stmt_add_protocol FROM @alter_protocol_sql;
EXECUTE stmt_add_protocol;
DEALLOCATE PREPARE stmt_add_protocol;

INSERT INTO species (image_url, scientific_name, description, year_found, scientist_name, habitat, classification)
VALUES
('/species-images/Escherichia coli.jpeg','Escherichia coli','A rod-shaped bacterium commonly found in the intestines of humans and animals. Widely used in biotechnology and genetic engineering research.',1885,'Theodor Escherich','Intestinal tract of humans and animals','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('/species-images/Bacillus subtilis.jpeg','Bacillus subtilis','A Gram-positive soil bacterium known for enzyme production and spore formation.',1835,'Christian Gottfried Ehrenberg','Soil and plant rhizosphere','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('/species-images/Staphylococcus epidermidis.jpeg','Staphylococcus epidermidis','A bacterium commonly found on human skin and studied in skin microbiology.',1884,'Friedrich Julius Rosenbach','Human skin and mucous membranes','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('/species-images/Pseudomonas fluorescens.jpeg','Pseudomonas fluorescens','Soil bacterium producing fluorescent pigments used in environmental studies.',1895,'Walter Migula','Soil and water','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('/species-images/Lactobacillus acidophilus.jpeg','Lactobacillus acidophilus','A probiotic bacterium found in the digestive system and dairy products.',1900,'Ernst Moro','Digestive tract and fermented dairy','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('/species-images/Rhizobium leguminosarum.jpeg','Rhizobium leguminosarum','Soil bacterium forming symbiotic relationships with plant roots to fix nitrogen.',1889,'Martinus Beijerinck','Root nodules of legumes','Domain: Bacteria; Phylum: Proteobacteria; Class: Alphaproteobacteria'),
('/species-images/Azotobacter chroococcum.jpeg','Azotobacter chroococcum','Free-living nitrogen fixing bacterium that improves soil fertility.',1901,'Martinus Beijerinck','Agricultural soil','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('/species-images/mycobacterium smegmatis.jpeg','Mycobacterium smegmatis','Non-pathogenic bacterium used as a model organism in tuberculosis research.',1884,'Albert Lehmann & Rudolf Neumann','Soil, water, and lab cultures','Domain: Bacteria; Phylum: Actinobacteria; Class: Actinobacteria'),
('/species-images/Clostridium sporogenes.jpeg','Clostridium sporogenes','Anaerobic bacterium used to study fermentation and anaerobic metabolism.',1908,'Ivan Hall','Anaerobic soil and sediments','Domain: Bacteria; Phylum: Firmicutes; Class: Clostridia'),
('/species-images/Lactococcus lactis.jpeg','Lactococcus lactis','Bacterium widely used in dairy fermentation for cheese and yogurt production.',1873,'Joseph Lister','Milk and dairy processing environments','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('/species-images/Micrococcus luteus.jpeg','Micrococcus luteus','Yellow pigment producing bacterium found in air, soil, and skin.',1872,'Ferdinand Cohn','Airborne dust, soil, and skin','Domain: Bacteria; Phylum: Actinobacteria; Class: Actinobacteria'),
('/species-images/Enterobacter aerogenes.jpeg','Enterobacter aerogenes','Rod-shaped bacterium used in biochemical and microbiology studies.',1896,'Hormaeche & Edwards','Soil, water, and intestinal tract','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('/species-images/Proteus vulgaris.jpeg','Proteus vulgaris','Motile bacterium known for swarming movement on surfaces.',1885,'Gustav Hauser','Intestinal tracts and moist environments','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('/species-images/Serratia marcescens.jpeg','Serratia marcescens','Bacterium famous for producing the red pigment prodigiosin.',1819,'Bartolomeo Bizio','Water, soil, and damp surfaces','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('/species-images/Klebsiella pneumoniae.jpeg','Klebsiella pneumoniae','Capsule-forming bacterium studied for bacterial virulence.',1882,'Carl Friedlander','Respiratory and intestinal environments','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('/species-images/Bacillus megaterium.jpeg','Bacillus megaterium','One of the largest bacteria used in biotechnology and enzyme production.',1884,'Anton de Bary','Soil and marine sediments','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('/species-images/Bacillus cereus.jpeg','Bacillus cereus','Spore-forming bacterium studied in food microbiology.',1887,'Frankland & Frankland','Soil and food processing systems','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('/species-images/Pseudomonas putida.jpeg','Pseudomonas putida','Soil bacterium capable of breaking down environmental pollutants.',1961,'Mortimer Palleroni','Soil and wastewater','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('/species-images/Acetobacter aceti.jpeg','Acetobacter aceti','Bacterium responsible for converting alcohol into acetic acid in vinegar production.',1864,'Louis Pasteur','Fermentation vessels and sugary liquids','Domain: Bacteria; Phylum: Proteobacteria; Class: Alphaproteobacteria'),
('/species-images/Nitrosomonas europaea.jpeg','Nitrosomonas europaea','Important bacterium in the nitrogen cycle that converts ammonia into nitrite.',1890,'Sergei Winogradsky','Soil and aquatic nitrifying systems','Domain: Bacteria; Phylum: Proteobacteria; Class: Betaproteobacteria')
ON DUPLICATE KEY UPDATE
  scientific_name = scientific_name;

UPDATE species
SET protocol = 'Species protocol is not documented yet for this record.'
WHERE protocol IS NULL OR protocol = '';

UPDATE species
SET protocol = 'Escherichia coli Laboratory Preparation - Educational Explanation

1. Selection of Strain
- Scientists first choose a suitable E. coli strain.
- Different strains are used for genetic engineering, protein production, and research studies.
- Lab strains are selected to be safe and easy to study.

2. Preparation of Nutrient Environment
- E. coli needs nutrients to grow.
- Scientists prepare a growth environment containing energy sources, nitrogen compounds, minerals, vitamins, and water.
- This environment supports bacterial multiplication.

3. Sterile Laboratory Conditions
- All materials are kept sterile.
- Sterility prevents contamination from unwanted microbes.
- This helps scientists maintain pure bacterial samples.

4. Introduction of Bacteria into Growth Environment
- Scientists transfer bacteria into nutrient medium using controlled laboratory techniques.
- This allows bacteria to start multiplying.

5. Controlled Growth Conditions
- E. coli grows best under warm temperatures, proper moisture, and nutrient availability.
- It can grow with or without oxygen depending on experimental setup.
- These conditions support rapid bacterial growth.

6. Monitoring Growth
- Scientists observe colony formation, growth speed, physical characteristics, and culture purity.
- This confirms successful bacterial growth.

7. Storage and Maintenance
- After growth, bacteria may be preserved for future use.
- Preservation supports repeatable educational and research workflows.'
WHERE scientific_name = 'Escherichia coli'
  AND (protocol IS NULL OR protocol = '' OR protocol = 'Species protocol is not documented yet for this record.');
