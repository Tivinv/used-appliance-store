-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access for products, categories, and settings
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access for product_specifications" ON product_specifications FOR SELECT USING (true);
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for settings" ON settings FOR SELECT USING (true);

-- Public insert access for orders (customers can create orders)
CREATE POLICY "Public insert access for orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for order_items" ON order_items FOR INSERT WITH CHECK (true);

-- Admin access for all operations (you'll need to set up authentication)
-- For now, we'll allow all operations for development
CREATE POLICY "Admin access for products" ON products FOR ALL USING (true);
CREATE POLICY "Admin access for product_specifications" ON product_specifications FOR ALL USING (true);
CREATE POLICY "Admin access for categories" ON categories FOR ALL USING (true);
CREATE POLICY "Admin access for orders" ON orders FOR ALL USING (true);
CREATE POLICY "Admin access for order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "Admin access for settings" ON settings FOR ALL USING (true);
