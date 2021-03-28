Log errored queries.
Library logs only errored queries..

[![npm](https://img.shields.io/npm/v/pg-error-logger)](https://www.npmjs.com/package/pg-error-logger)

### Installation

- npm: `npm i -S pg-error-logger`
- yarn: `yarn add pg-error-logger`

### Usage

Patch original query method:
```typescript
import pg from 'pg'
import pgErrorLogger from 'pg-error-logger'

const client = new pg.Client()

pgErrorLogger.patchQuery(client)
```


### Example

Log output example

```log
invalid input syntax for type uuid: ""60607e87372fd51c9c334881""
=================  SQL  =================
INSERT INTO orders (id,  user_id, address_id)
VALUES             ($1,     $2  ,     $3    )
================ VALUES ================
["87f183e9-6ce6-40ef-b58f-3104baee5ae1","dafab45a-3518-40af-8719-519e13d9b034","60607e87372fd51c9c334881"]
========================================
```
