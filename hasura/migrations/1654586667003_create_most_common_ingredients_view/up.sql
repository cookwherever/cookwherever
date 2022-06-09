CREATE OR REPLACE VIEW most_common_ingredients AS SELECT name, count(*) as ingredient_count FROM recipe_ingredients GROUP BY name ORDER BY ingredient_count DESC;
