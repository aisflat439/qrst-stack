---
title: Chapter Three
description: Stand up our API
---

Set up our API

## Infrastructure setup

The `MyStack.ts` file that the starter gets you going with setups you up with an API. WE want to pull this out of the single file and create one for itself. This will help us keep things tidy. Create an `Api.ts` and put the following in it.

```ts
import { StackContext, Api as ApiGateway } from "sst/constructs";

export function Api({ stack }: StackContext) {
  const api = new ApiGateway(stack, "Api", {
    routes: {
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
    },
  });

  stack.addOutputs({
    API_URL: api.customDomainUrl || api.url,
  });

  return api;
}
```

This moves the existing routs into this folder and adds our `trpc` routes. While we're at it, rename `MyStack.ts` to `Bus.ts` and update that code to the following.

```ts
import { StackContext, EventBus } from "sst/constructs";

export function Bus({ stack }: StackContext) {
  const bus = new EventBus(stack, "EventBus", {
    defaults: {
      retries: 10,
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });
}
```

Now we just need to update the `sst.config`:

```ts
import { SSTConfig } from "sst";
import { Bus } from "./stacks/Bus";
import { Api } from "./stacks/Api";
import { Web } from "./stacks/Web";
import { Marketing } from "./stacks/Marketing";

export default {
  config(_input) {
    return {
      name: "anesthesia",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Bus).stack(Api).stack(Web).stack(Marketing);
  },
} satisfies SSTConfig;
```

We've now set up our infrastructure to have an event bus, api gateway and the two websites. Any changes we need to make will be isolated to thier own files. We'll be able to add infra along the way as needed.

## API Gateway + tRPC

The goal with this stack is to have end to end typesafety so that intellisense tells us what we need to do. `tRPC` has a move fast break nothing philosophy which appeals to me. SST is also deeply focused on typesafety. This helps us build with confidence, and, over time we learn to move quickly.

Let's set up our backends trpc endpoints first and then we can connect them to the front end.

```
cd packages/functions

pnpm i @trpc/server
pnpm i zod
```

Inside `packages/functions/src` create a `trpc.ts` file. Add the following:

```ts
import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { z } from "zod";

export const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.input(z.string()).mutation(({ input }) => {
    return `Hello, ${input}!`;
  }),
});

// export type definition of API
export type Router = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
```

This creates an appRouter, an aws handler and appropriate types for our router. This will allow us to expose the types from that router to our client applications giving us end to end type safety. This will be incredibly useful when we have both a web and mobile app. Typically, our `hello` function would be a promise of some sort, but right now we're just returning the value requested.

`tRPC` is awesome. The one area where it falls a little short is that we often want to be able to use `postman`, `curl` or similar tools to test a function especially when building things out initially. Fortunately, there's a straightforward solution that will help us in setting up our various functions. We can create a caller function that lets us interact with our `tRPC` router and make sure everything is wired up correctly.

This pattern is called `Server Side Calls`.

Let's create a route called `/caller` on our api, add a function and connect `tRPC` to it:

```ts
// Api.ts
  const api = new ApiGateway(stack, "api", {
    routes: {
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "GET /caller": "packages/functions/src/caller.handler", // <---- Add this
    },
  });
}

```

Let's create our caller function:

```ts
// packages/functions/src/caller.ts
import { ApiHandler } from "sst/node/api";
import { caller } from "./trpc";

export const handler = ApiHandler(async (_evt) => {
  const test = await caller.hello("world");
  console.log("test: ", test);

  return {
    statusCode: 200,
  };
});
```

And finally in our `tRPC` router, we'll add in a caller so that we can access it

```ts
// packages/functions/src/trpc.ts

/* ... */
export const handler = awsLambdaRequestHandler({
  router: appRouter,
});

const createCaller = t.createCallerFactory(appRouter);
export const caller = createCaller({});
```

Now all you need to do is go into the SST console and invoke the `/caller` function and see it works!

This same caller pattern is used for integration tests. While that may not be something you need just now, it's important that you know it exists in the future.

## Extra Reading

- Open a tab for [trpc](https://trpc.io/), read the docs when you have time.
