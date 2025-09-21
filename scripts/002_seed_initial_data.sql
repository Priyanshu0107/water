-- Insert sample cost components for different system types
INSERT INTO public.cost_components (component_type, component_name, unit_cost, unit, region, quality_grade, is_active) VALUES
-- Catchment components
('catchment', 'Roof Cleaning System', 2500.00, 'per_sqm', 'India', 'standard', true),
('catchment', 'Gutter Installation', 450.00, 'per_meter', 'India', 'standard', true),
('catchment', 'Downpipe System', 350.00, 'per_meter', 'India', 'standard', true),
('catchment', 'First Flush Diverter', 8500.00, 'per_unit', 'India', 'standard', true),

-- Storage components
('storage', 'Plastic Tank (1000L)', 12000.00, 'per_unit', 'India', 'standard', true),
('storage', 'Plastic Tank (2000L)', 18000.00, 'per_unit', 'India', 'standard', true),
('storage', 'Plastic Tank (5000L)', 35000.00, 'per_unit', 'India', 'standard', true),
('storage', 'Concrete Tank (10000L)', 85000.00, 'per_unit', 'India', 'standard', true),
('storage', 'Underground Sump (20000L)', 150000.00, 'per_unit', 'India', 'standard', true),

-- Filtration components
('filtration', 'Sand Filter System', 15000.00, 'per_unit', 'India', 'standard', true),
('filtration', 'Carbon Filter', 8500.00, 'per_unit', 'India', 'standard', true),
('filtration', 'UV Sterilizer', 12000.00, 'per_unit', 'India', 'standard', true),
('filtration', 'Sediment Filter', 2500.00, 'per_unit', 'India', 'standard', true),

-- Distribution components
('distribution', 'Pump System (0.5HP)', 8500.00, 'per_unit', 'India', 'standard', true),
('distribution', 'Pump System (1HP)', 12000.00, 'per_unit', 'India', 'standard', true),
('distribution', 'Pressure Tank', 6500.00, 'per_unit', 'India', 'standard', true),
('distribution', 'Distribution Piping', 125.00, 'per_meter', 'India', 'standard', true),

-- Installation and labor
('installation', 'System Installation', 25000.00, 'per_system', 'India', 'standard', true),
('installation', 'Electrical Work', 8500.00, 'per_system', 'India', 'standard', true),
('installation', 'Plumbing Work', 12000.00, 'per_system', 'India', 'standard', true),

-- Maintenance components
('maintenance', 'Annual Maintenance', 5000.00, 'per_year', 'India', 'standard', true),
('maintenance', 'Filter Replacement', 2500.00, 'per_year', 'India', 'standard', true);

-- Insert sample rainfall data for major Indian cities
INSERT INTO public.rainfall_data (location_coordinates, year, month, rainfall_mm, data_source) VALUES
-- Mumbai (19.0760, 72.8777)
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 1, 2.5, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 2, 1.8, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 3, 5.2, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 4, 12.3, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 5, 45.7, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 6, 485.2, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 7, 612.8, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 8, 521.4, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 9, 298.6, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 10, 85.3, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 11, 15.2, 'IMD'),
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 2023, 12, 3.1, 'IMD'),

-- Delhi (28.6139, 77.2090)
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 1, 18.5, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 2, 22.3, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 3, 15.8, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 4, 8.2, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 5, 25.4, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 6, 65.8, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 7, 185.2, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 8, 142.6, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 9, 95.3, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 10, 12.1, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 11, 5.2, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 2023, 12, 8.9, 'IMD'),

-- Bangalore (12.9716, 77.5946)
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 1, 2.1, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 2, 5.8, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 3, 18.5, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 4, 65.2, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 5, 125.8, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 6, 85.4, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 7, 95.6, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 8, 142.3, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 9, 185.7, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 10, 165.2, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 11, 45.8, 'IMD'),
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 2023, 12, 12.5, 'IMD');
