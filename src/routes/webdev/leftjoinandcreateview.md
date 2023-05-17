---
title: Join Tables and Create a New View
tag: sql
featured: false
type: supabase
id: 10
---

Say I want to join 2 tables and create a new view out of them.

```sql
create view "dictionarywordrootsvedicconcordance" as
select w.form, w.root, w.class, w.person, w.number, w.wordmode, w.voice,
d.word as dword, d.grammar, d.meanings,
c.word as vcword, c.occurence, c.reference
from "db-wordroots" w
left join "db-dictionary" d
on w.form = d.word 
left join "vedicconcordance2" c
on w.form = c.word;
```

