---
title: SQL - trim columns
tags: sql
type: code
---


```sql
UPDATE "brhat-openlibrary" SET slug = REPLACE(LOWER(TRIM("Text")), ' ', '');
```

