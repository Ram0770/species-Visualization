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
('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80','Escherichia coli','A rod-shaped bacterium commonly found in the intestines of humans and animals. Widely used in biotechnology and genetic engineering research.',1885,'Theodor Escherich','Intestinal tract of humans and animals','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('https://images.unsplash.com/photo-1576089172869-4f5f6f315620?auto=format&fit=crop&w=1200&q=80','Bacillus subtilis','A Gram-positive soil bacterium known for enzyme production and spore formation.',1835,'Christian Gottfried Ehrenberg','Soil and plant rhizosphere','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80','Staphylococcus epidermidis','A bacterium commonly found on human skin and studied in skin microbiology.',1884,'Friedrich Julius Rosenbach','Human skin and mucous membranes','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1200&q=80','Pseudomonas fluorescens','Soil bacterium producing fluorescent pigments used in environmental studies.',1895,'Walter Migula','Soil and water','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80','Lactobacillus acidophilus','A probiotic bacterium found in the digestive system and dairy products.',1900,'Ernst Moro','Digestive tract and fermented dairy','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80','Rhizobium leguminosarum','Soil bacterium forming symbiotic relationships with plant roots to fix nitrogen.',1889,'Martinus Beijerinck','Root nodules of legumes','Domain: Bacteria; Phylum: Proteobacteria; Class: Alphaproteobacteria'),
('https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=1200&q=80','Azotobacter chroococcum','Free-living nitrogen fixing bacterium that improves soil fertility.',1901,'Martinus Beijerinck','Agricultural soil','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80','Mycobacterium smegmatis','Non-pathogenic bacterium used as a model organism in tuberculosis research.',1884,'Albert Lehmann & Rudolf Neumann','Soil, water, and lab cultures','Domain: Bacteria; Phylum: Actinobacteria; Class: Actinobacteria'),
('https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80','Clostridium sporogenes','Anaerobic bacterium used to study fermentation and anaerobic metabolism.',1908,'Ivan Hall','Anaerobic soil and sediments','Domain: Bacteria; Phylum: Firmicutes; Class: Clostridia'),
('https://images.unsplash.com/photo-1628592102751-ba83b0314276?auto=format&fit=crop&w=1200&q=80','Lactococcus lactis','Bacterium widely used in dairy fermentation for cheese and yogurt production.',1873,'Joseph Lister','Milk and dairy processing environments','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('https://images.unsplash.com/photo-1617791160588-241658c0f566?auto=format&fit=crop&w=1200&q=80','Micrococcus luteus','Yellow pigment producing bacterium found in air, soil, and skin.',1872,'Ferdinand Cohn','Airborne dust, soil, and skin','Domain: Bacteria; Phylum: Actinobacteria; Class: Actinobacteria'),
('https://images.unsplash.com/photo-1583912086296-be5ca6f95fd8?auto=format&fit=crop&w=1200&q=80','Enterobacter aerogenes','Rod-shaped bacterium used in biochemical and microbiology studies.',1896,'Hormaeche & Edwards','Soil, water, and intestinal tract','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?auto=format&fit=crop&w=1200&q=80','Proteus vulgaris','Motile bacterium known for swarming movement on surfaces.',1885,'Gustav Hauser','Intestinal tracts and moist environments','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80','Serratia marcescens','Bacterium famous for producing the red pigment prodigiosin.',1819,'Bartolomeo Bizio','Water, soil, and damp surfaces','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&w=1200&q=80','Klebsiella pneumoniae','Capsule-forming bacterium studied for bacterial virulence.',1882,'Carl Friedlander','Respiratory and intestinal environments','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('https://images.unsplash.com/photo-1607805074778-1d2f1f7d4bca?auto=format&fit=crop&w=1200&q=80','Bacillus megaterium','One of the largest bacteria used in biotechnology and enzyme production.',1884,'Anton de Bary','Soil and marine sediments','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('https://images.unsplash.com/photo-1600959907703-125ba1374a12?auto=format&fit=crop&w=1200&q=80','Bacillus cereus','Spore-forming bacterium studied in food microbiology.',1887,'Frankland & Frankland','Soil and food processing systems','Domain: Bacteria; Phylum: Firmicutes; Class: Bacilli'),
('https://images.unsplash.com/photo-1583912267550-d4bcddfb80dd?auto=format&fit=crop&w=1200&q=80','Pseudomonas putida','Soil bacterium capable of breaking down environmental pollutants.',1961,'Mortimer Palleroni','Soil and wastewater','Domain: Bacteria; Phylum: Proteobacteria; Class: Gammaproteobacteria'),
('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80','Acetobacter aceti','Bacterium responsible for converting alcohol into acetic acid in vinegar production.',1864,'Louis Pasteur','Fermentation vessels and sugary liquids','Domain: Bacteria; Phylum: Proteobacteria; Class: Alphaproteobacteria'),
('https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80','Nitrosomonas europaea','Important bacterium in the nitrogen cycle that converts ammonia into nitrite.',1890,'Sergei Winogradsky','Soil and aquatic nitrifying systems','Domain: Bacteria; Phylum: Proteobacteria; Class: Betaproteobacteria')
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  year_found = VALUES(year_found),
  scientist_name = VALUES(scientist_name),
  habitat = VALUES(habitat),
  classification = VALUES(classification),
  image_url = VALUES(image_url),
  updated_at = CURRENT_TIMESTAMP;

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
WHERE scientific_name = 'Escherichia coli';
