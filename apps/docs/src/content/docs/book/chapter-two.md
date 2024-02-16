---
title: Chapter Two
description: Create your react admin app
---

Create a react admin app.

## Just choose React

There's a lot of options and opinions. You can do what makes you happy. I'm just picking React. I'll have a React Native app and a React app. This allows code sharing. If you pick something else cool! Good luck. I don't know about other things. I won't pick NextJS or Remix or whatever. We don't need server side rendering. Also, bundle size doesn't matter in the context of a web page with the domain `admin.myapp.com`. Eliminating those problems is nice.TRPC allows us to share some logic between clients. Code sharing is also nice.

This book only covers React, React Native, TRPC and SST.

## Create resources for Admin application

```ts
import { StackContext, StaticSite } from "sst/constructs";

export function Web({ stack }: StackContext) {
  const isProduction = stack.stage === "prod";
  const domain = {
    customDomain: {
      domainName: "something-here.com",
      domainAlias: "www.something-here.com",
    },
  };

  const site = new StaticSite(stack, "site", {
    ...(isProduction && domain),
    path: "packages/web",
    buildCommand: "npm run build",
    buildOutput: "dist",
  });

  stack.addOutputs({
    SITE: site.url || "https://localhost:3000",
  });
}
```

## Extra Reading

- Open a tab for [PNPM](https://pnpm.io/), read the docs when you have time.
- Open a tab for [Astro](https://astro.build/), read the docs when you have time.
