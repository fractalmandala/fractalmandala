---
title: Create RPC Functions
tags: postgresql
featured: false
---

RPC functions in Supabase can be called via JS at web front-ends. This basically opens a way to run SQL queries in the website to fetch and render data.

```sql
CREATE OR REPLACE FUNCTION nameFunction()
RETURNS TABLE (field1 TEXT, field2 INTEGER, id INTEGER) AS $$
BEGIN
RETURN QUERY
SELECT DISTINCT ON (field1) field1::text, field2, id
FROM "table_name"
ORDER BY field1, id DESC;
END;
$$ LANGUAGE plpgsql;
```

