-- Insert default settings
INSERT INTO settings (key, value) VALUES
('exchange_rate', '41'),
('store_name', 'Б/У техніка з Німеччини'),
('store_phone', '+380976601362'),
('store_address', 'м. Баранівка, 1-й провулок Софіївський, 26а'),
('store_coordinates', '50.2991780,27.6800604')
ON CONFLICT (key) DO NOTHING;
