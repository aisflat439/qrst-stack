---
title: Chapter Four
description: Add DynamoDB
---

## Dynamo and ElectroDB

We'll use Dynamo and ElectroDB. This is a great stack for all our CRUD type stuff. And most of SaaS is CRUD. So Dynamo is a perfect fit. Let's add a couple packages to `core` so that we can model some entities.

```bash
# cd into /core
pnpm i electrodb
pnpm i @aws-sdk/client-dynamodb
pnpm i ulid
```

We'll set up a straightforward item that we can use to begin modeling.

```ts
export * as Product from "./product";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const ProductEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Product",
      service: "product",
    },
    attributes: {
      productId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
      description: {
        type: "string",
      },
      price: {
        type: "number",
      },
      cost: {
        type: "number",
      },
    },
    indexes: {
      products: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["productId"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type ProductEntityType = EntityItem<typeof ProductEntity>;

export async function createProduct(
  name: string,
  description?: string | null,
  price?: number | null,
  cost?: number | null
) {
  return ProductEntity.create({
    productId: ulid(),
    name,
    description: description || "",
    price: price || 0,
    cost: cost || 0,
  }).go();
}
```

### Create Dynamo Table

Next we'll create a DynamoDB table for our application. We're going to preload a couple GSI's in advance.

```ts
// stacks/Database.ts
import { StackContext, Table } from "sst/constructs";

export function Database({ stack }: StackContext) {
  const table = new Table(stack, "DynamoTable", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
      gsi3pk: "string",
      gsi3sk: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk",
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk",
      },
      gsi2: {
        partitionKey: "gsi2pk",
        sortKey: "gsi2sk",
      },
      gsi3: {
        partitionKey: "gsi3pk",
        sortKey: "gsi3sk",
      },
    },
  });

  return table;
}
```

## Extra Reading

- Open a tab for [ElectroDB](https://electrodb.dev/en/core-concepts/introduction/), read the docs when you have time.
- Purchse [The DynamoDB book](https://www.dynamodbbook.com/), read it.
