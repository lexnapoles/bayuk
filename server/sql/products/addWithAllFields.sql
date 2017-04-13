INSERT
INTO products (owner, uuid, name, description, category, price, created_at, sold)
VALUES (${owner}, ${uuid}, ${name}, ${description}, ${category}, ${price}, ${createdAt}, ${sold});

SELECT * FROM products_with_images WHERE id = ${uuid};