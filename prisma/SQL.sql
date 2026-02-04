-- Command to paste after migration

INSERT INTO product (name, description, imageUrl, category)
VALUES
-- Pizzas
('margherita', 'Classic pizza with tomato sauce and mozzarella.', '/images/pizzas/margherita.png', 'PIZZA'),
('pepperoni', 'Pepperoni, mozzarella, and tomato sauce.', '/images/pizzas/pepperoni.png', 'PIZZA'),
('hawaiian', 'Ham, pineapple, mozzarella, and tomato sauce.', '/images/pizzas/hawaiian.png', 'PIZZA'),
('veggie', 'Mixed vegetables, mozzarella, and tomato sauce.', '/images/pizzas/veggie.png', 'PIZZA'),
('bbq chicken', 'Chicken, BBQ sauce, mozzarella, and onions.', '/images/pizzas/bbqchicken.png', 'PIZZA'),
('four cheese', 'Mozzarella, cheddar, parmesan, and gorgonzola.', '/images/pizzas/fourcheese.png', 'PIZZA'),
('meat lovers', 'Pepperoni, ham, sausage, bacon, mozzarella.', '/images/pizzas/meatlovers.png', 'PIZZA'),
('mushroom', 'Mushrooms, mozzarella, and tomato sauce.', '/images/pizzas/mushroom.png', 'PIZZA'),

-- Sauces
('tomato sauce', 'Classic Italian tomato sauce with herbs.', '/images/sauces/tomato.png', 'SAUCE'),
('garlic sauce', 'Creamy garlic sauce, perfect for dipping.', '/images/sauces/garlic.png', 'SAUCE'),
('barbecue sauce', 'Smoky BBQ sauce with a hint of sweetness.', '/images/sauces/bbq.png', 'SAUCE'),

-- Drinks
('coca-cola', 'Refreshing classic cola drink.', '/images/drinks/coke.png', 'DRINK'),
('fanta', 'Orange flavored soda.', '/images/drinks/fanta.png', 'DRINK'),
('water', 'Still mineral water.', '/images/drinks/water.png', 'DRINK'),
('sprite', 'Lemon-lime soda.', '/images/drinks/sprite.png', 'DRINK');

INSERT INTO ingredient (name)
VALUES
('mozzarella'),
('tomato sauce'),
('pepperoni'),
('ham'),
('pineapple'),
('mushrooms'),
('onions'),
('cheddar'),
('parmesan'),
('gorgonzola'),
('chicken'),
('bacon'),
('sausage'),
('mixed vegetables'),
('bbq sauce'),
('garlic');

-- there is something to fix in this command
-- IMPORTANT: Make sure the productId and ingredientId match the actual IDs in your database
SELECT id, name FROM product;

-- Margherita (id: 1)
INSERT INTO productIngredient (productId, ingredientId) VALUES
(1, 1), -- mozzarella
(1, 2); -- tomato sauce

-- Pepperoni (id: 2)
INSERT INTO productIngredient (productId, ingredientId) VALUES
(2, 1), -- mozzarella
(2, 2), -- tomato sauce
(2, 3); -- pepperoni

-- Hawaiian (id: 3)
INSERT INTO productIngredient (productId, ingredientId) VALUES
(3, 1), -- mozzarella
(3, 2), -- tomato sauce
(3, 4), -- ham
(3, 5); -- pineapple

-- Veggie (id: 4)
INSERT INTO productIngredient (productId, ingredientId) VALUES
(4, 1), -- mozzarella
(4, 2), -- tomato sauce
(4, 6), -- mushrooms
(4, 7), -- onions
(4, 13); -- mixed vegetables

-- BBQ Chicken (id: 5)
INSERT INTO productIngredient (productId, ingredientId) VALUES
(5, 1), -- mozzarella
(5, 10), -- chicken
(5, 14), -- bbq sauce
(5, 7); -- onions

-- Four Cheese (id: 6)
INSERT INTO productIngredient (productId, ingredientId) VALUES
(6, 1), -- mozzarella
(6, 8), -- cheddar
(6, 9), -- parmesan
(6, 10); -- gorgonzola

-- Meat Lovers (id: 7)
INSERT INTO productIngredient (productId, ingredientId) VALUES
(7, 1), -- mozzarella
(7, 3), -- pepperoni
(7, 4), -- ham
(7, 11), -- bacon
(7, 12); -- sausage

-- Mushroom (id: 8)
INSERT INTO productIngredient (productId, ingredientId) VALUES
(8, 1), -- mozzarella
(8, 2), -- tomato sauce
(8, 6); -- mushrooms

-- verify inserted products
SELECT id, name FROM product;

-- Pizzas: small, medium, large
INSERT INTO productSize (productId, sizeName, price) VALUES
(1, 'small', 18.0), (1, 'medium', 24.0), (1, 'large', 30.0),         -- margherita
(2, 'small', 19.0), (2, 'medium', 25.0), (2, 'large', 31.0),         -- pepperoni
(3, 'small', 20.0), (3, 'medium', 26.0), (3, 'large', 32.0),         -- hawaiian
(4, 'small', 18.0), (4, 'medium', 24.0), (4, 'large', 30.0),         -- veggie
(5, 'small', 21.0), (5, 'medium', 27.0), (5, 'large', 33.0),         -- bbq chicken
(6, 'small', 20.0), (6, 'medium', 26.0), (6, 'large', 32.0),         -- four cheese
(8, 'small', 18.0), (8, 'medium', 24.0), (8, 'large', 30.0);         -- mushroom

-- Sauces: default size
INSERT INTO productSize (productId, sizeName, price) VALUES
(9, 'default', 2.0),      -- tomato sauce
(10, 'default', 2.5),     -- garlic sauce
(11, 'default', 2.5);     -- barbecue sauce

-- Drinks: 0.5L size
INSERT INTO productSize (productId, sizeName, price) VALUES
(12, '0.5L', 5.0),        -- coca-cola
(13, '0.5L', 5.0),        -- fanta
(14, '0.5L', 4.0),        -- water
(15, '0.5L', 5.0);        -- sprite