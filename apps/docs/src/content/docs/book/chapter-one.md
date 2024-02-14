---
title: Chapter One
description: Start a project and setup PNPM
---

Start a project and setup PNPM

## Install a new SST Project

I always forget how to do this but it's as straightforward as `pnpm create sst`.

### PNPM

SST suggests we use PNPM. So we'll use pnpm. There's only a couple things that you'll need to know.

#### Workspaces

PNPM has a `pnpm-workspace.yaml` file. This tells PNPM where to install packages. Add an `apps/` directory. It should be on the same level as your `packages` directory.

```
.sst/
.vscode/
apps/
packages/
stacks/
sst.config.ts
```

Update your PNPM to include the apps directory the same way the packages directory is added.

### Add an Astro Site

Change directories into `/apps` and create an Astro Site. We're not going to do a ton here just yet. But it will become the marketing site for our application.

Astro is great for lots of things. We're using for all the marketing, blog and sales page content for our app. If our app was an inventory app named `buenoinventory`, the result will eventually look like this:

```
www.buenoinventory.com <--- astro
www.app.buenoinventroy.com <--- react app
```

Astro will power the marketing. We'll use astro's cli to create the project. But we don't need to install dependencies or created a github repo. Run `pnpm create @astro/latest marketing` and get started.

We now need to update our project to use this new app. In the Stacks directory create a new file called `stacks/Marketing.ts`. This will be the infrastructure for our marketing site.

```ts
import { AstroSite, StackContext } from "sst/constructs";

export async function MarketingStack({ stack }: StackContext) {
  // Create the Astro site
  const site = new AstroSite(stack, "MarketingSite", {
    path: "apps/marketing",
  });

  stack.addOutputs({
    MarketingSiteURL: site.url,
  });
}
```

## Dependecies and git

Next we need to install dependencies, create a git repository and commit our work. Create a project in github.

```
pnpm i
git init
git add .
git commit -m "inital commit"
```

Then choose this section in the repo. I always forget this command. The `SaaS` I'm working on while writing this book is called `anesthesia` so this is what the code looks like to me. Yours should be similar, but your name and your repo name.

```
git remote add origin git@github.com:aisflat439/anesthesia.git
git branch -M main
git push -u origin main
```

## Get a Domain and launch

_What? Are you crazy?_

No. We want to be live as soon as possible for a lot of reasons. The first is that it's easier for one person to manage CI/CD that grows over time. It's very hard to figure out why your app didn't launch or build correctly once you've built everything. But if you build and release a lot, it's really straightforward to figure out what you've broken. And surely, you'll break something. At least I will.

## Extra Reading

- Open a tab for [PNPM](https://pnpm.io/), read the docs when you have time.
- Open a tab for [Astro](https://astro.build/), read the docs when you have time.
