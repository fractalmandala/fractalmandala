---
title: Split Words, or Text to Columns
tags: sql
type: code
---

```sql
SELECT unnest(string_to_array(my_column, '[II]+|I')) as my_column
FROM my_table;
```


