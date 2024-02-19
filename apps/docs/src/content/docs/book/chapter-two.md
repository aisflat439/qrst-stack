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

  const site = new StaticSite(stack, "WebSite", {
    ...(isProduction && domain),
    path: "apps/web",
    buildCommand: "npm run build",
    buildOutput: "dist",
  });

  stack.addOutputs({
    SITE: site.url || "https://localhost:5173", // <--- this should be the vite url
  });
}
```

This sets up the infrastructure for your React ppp. The React app will be how your customers interact with your application from a website. In order to create the react app for the front end we need to use vite.

```bash
# cd into the apps directory and run
pnpm create vite web --template typescript-react
```

Update the package json so that SST drives the application with SST Bind.

```json
  "scripts": {
    "dev": "sst bind vite", <-------- this is updated
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

Your project tree will now be something like

```bash
apps
  - marketing
  - web
packages
  - core
  - functions
stacks
  - Marketing
  - MyStack
  - Web
sst.config.ts
package.json
tsconfig
pnpm-workspace.yaml
```

## Check that everything is wired up

The first thing that we'll want to do is ensure that everything is wired up correctly. Let's check that our enviromental variables are sent along from our infrastructure to our application.

Update your infrastucture to:

```ts
const site = new StaticSite(stack, "WebSite", {
  ...(isProduction && domain),
  path: "apps/web", // <---- note this here
  buildCommand: "npm run build",
  buildOutput: "dist",
  environment: {
    VITE_APP_TEST: "test",
  },
});
```

Run the app by having two terminals up. One in `/` and one in `/apps/web`. Now we just need to make sure that the react app is running correctly.

Update `app.tsx` to

```tsx
import "./App.css";

function App() {
  // log out process env
  console.log(import.meta.env.VITE_APP_TEST);

  return (
    <>
      <div>
        <p>hello</p>
      </div>
    </>
  );
}

export default App;
```

You should find that you have the word "test" in your console. IME this sometimes doesn't work just right so it's vital that we make sure this step works.

We'll do the same test in the marketing site.

```ts
// update Marketing.ts to
const site = new AstroSite(stack, "MarketingSite", {
  path: "apps/marketing",
  environment: {
    PUBLIC_TEST: "test",
    SECRET_TEST: "secret-test",
  },
});
```

In your astro site's `index.astro` add:

```ts
---
import Layout from "../layouts/Layout.astro";

console.log("Hello from the index page");  // <--
console.log(import.meta.env.PUBLIC_TEST);
console.log(import.meta.env.SECRET_TEST);
---

<Layout title="Welcome to [Your app name here].">
```

In the case of astro, we're logging in the server section. Remember that `SECRET_` will only be available on the server side of the app and you should prepend the rest with `PUBLIC_` because those are accessible in the client. Eventually, we'll pass values like an API url here.

## Extra Reading

- Open a tab for [PNPM](https://pnpm.io/), read the docs when you have time.
- Open a tab for [Astro](https://astro.build/), read the docs when you have time.
