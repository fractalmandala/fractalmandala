---
title: Create a Column of Vector Embeddings for Search Index
tag: vectors
featured: true
type: supabase
id: 19
---

This query allows one to create a column of vector embeddings.

```sql
alter table
  "brhatindex"
add column
  fts tsvector generated always as (to_tsvector('english', heading || ' ' || names )) stored;

create index brhat_fts on "brhatindex" using gin (fts); -- generate the index

select id, fts
from "brhatindex";
```

In the above, "brhatindex" is a table name, "heading" and "names" are field names. 