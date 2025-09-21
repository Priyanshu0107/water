-- Add PostgreSQL functions for geospatial calculations

-- Function to get nearby rainfall data within a radius
CREATE OR REPLACE FUNCTION get_nearby_rainfall_data(
  target_lat DECIMAL,
  target_lng DECIMAL,
  radius_km INTEGER DEFAULT 50
)
RETURNS TABLE (
  month INTEGER,
  rainfall_mm DECIMAL,
  year INTEGER,
  distance_km DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rd.month,
    rd.rainfall_mm,
    rd.year,
    ROUND(
      ST_Distance(
        ST_SetSRID(ST_MakePoint(target_lng, target_lat), 4326)::geography,
        rd.location_coordinates::geography
      ) / 1000, 2
    ) as distance_km
  FROM rainfall_data rd
  WHERE ST_DWithin(
    ST_SetSRID(ST_MakePoint(target_lng, target_lat), 4326)::geography,
    rd.location_coordinates::geography,
    radius_km * 1000
  )
  ORDER BY distance_km ASC, rd.year DESC, rd.month ASC;
END;
$$ LANGUAGE plpgsql;

-- Function to get nearby groundwater data
CREATE OR REPLACE FUNCTION get_nearby_groundwater_data(
  target_lat DECIMAL,
  target_lng DECIMAL,
  radius_km INTEGER DEFAULT 25
)
RETURNS TABLE (
  depth_meters DECIMAL,
  quality_parameters JSONB,
  seasonal_variation JSONB,
  measurement_date DATE,
  distance_km DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gd.depth_meters,
    gd.quality_parameters,
    gd.seasonal_variation,
    gd.measurement_date,
    ROUND(
      ST_Distance(
        ST_SetSRID(ST_MakePoint(target_lng, target_lat), 4326)::geography,
        gd.location_coordinates::geography
      ) / 1000, 2
    ) as distance_km
  FROM groundwater_data gd
  WHERE ST_DWithin(
    ST_SetSRID(ST_MakePoint(target_lng, target_lat), 4326)::geography,
    gd.location_coordinates::geography,
    radius_km * 1000
  )
  ORDER BY distance_km ASC, gd.measurement_date DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate distance between two points
CREATE OR REPLACE FUNCTION calculate_distance_km(
  lat1 DECIMAL,
  lng1 DECIMAL,
  lat2 DECIMAL,
  lng2 DECIMAL
)
RETURNS DECIMAL AS $$
BEGIN
  RETURN ROUND(
    ST_Distance(
      ST_SetSRID(ST_MakePoint(lng1, lat1), 4326)::geography,
      ST_SetSRID(ST_MakePoint(lng2, lat2), 4326)::geography
    ) / 1000, 2
  );
END;
$$ LANGUAGE plpgsql;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rainfall_data_location_year 
ON rainfall_data USING GIST (location_coordinates) 
WHERE year >= 2020;

CREATE INDEX IF NOT EXISTS idx_groundwater_data_location_date 
ON groundwater_data USING GIST (location_coordinates);

-- Add some sample groundwater data
INSERT INTO public.groundwater_data (location_coordinates, depth_meters, quality_parameters, seasonal_variation, data_source, measurement_date) VALUES
-- Mumbai area
(ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326), 15.5, '{"ph": 7.2, "tds": 450, "hardness": 180}', '{"monsoon": 12.0, "summer": 18.0}', 'CGWB', '2023-06-15'),
(ST_SetSRID(ST_MakePoint(72.9000, 19.1000), 4326), 22.3, '{"ph": 6.8, "tds": 520, "hardness": 220}', '{"monsoon": 18.0, "summer": 25.0}', 'CGWB', '2023-06-15'),

-- Delhi area
(ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326), 35.2, '{"ph": 7.5, "tds": 680, "hardness": 280}', '{"monsoon": 30.0, "summer": 40.0}', 'CGWB', '2023-06-15'),
(ST_SetSRID(ST_MakePoint(77.2500, 28.6500), 4326), 28.7, '{"ph": 7.1, "tds": 590, "hardness": 250}', '{"monsoon": 25.0, "summer": 32.0}', 'CGWB', '2023-06-15'),

-- Bangalore area
(ST_SetSRID(ST_MakePoint(77.5946, 12.9716), 4326), 45.8, '{"ph": 6.9, "tds": 380, "hardness": 150}', '{"monsoon": 40.0, "summer": 50.0}', 'CGWB', '2023-06-15'),
(ST_SetSRID(ST_MakePoint(77.6200, 12.9900), 4326), 38.5, '{"ph": 7.0, "tds": 420, "hardness": 170}', '{"monsoon": 35.0, "summer": 42.0}', 'CGWB', '2023-06-15');
