---
title: SQL - trim columns
tags: sql star
type: code
---


```sql
UPDATE "brhat-openlibrary" SET slug = REPLACE(LOWER(TRIM("Text")), ' ', '');
```

