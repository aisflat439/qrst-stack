---
title: Intro
description: What you do before you begin
---

You should work through the [SST Guide](https://sst.dev/guide.html) prior to begining this book. At a very minimum you should work through creating a [react app](https://sst.dev/examples/how-to-create-a-reactjs-app-with-serverless.html) with SST.

## What's the purpose of this book

The goal is provide a path for someone who becomes interested in SST and is mostly a front end developer to be able to build a SaaS by themselves. This is internal documentation for me as much as it's a tool for you. The goal is not provide a path for every possible thing. SaaS is generally pretty straightforwad with it's needs. An SPA is great for SaaS, we don't need server side rendering, so we don't use it. At all. That doesn't mean it's not important, it's just not important for this project. Instead, we add an Astro Site so that we have have a marketing site.

## I want to use

### Svelte

Okay! This book is not for you.

### NextJS

Okay! This book is not for you.

### ...

This is an opinionated set of directions for making SaaS apps built on top of SST. It's my opinions. There is a tutorials section set up that perhaps some day can add in other tools. If you want to write one, please feel welcome to. That said, we're focusing on my opinons here.

## Set up an AWS account (Do not skip this step)

We're building a SaaS. The dream outcome, however unlikely, is that you can sell your SaaS some day. In order to do this we need create an account so that when we sell we can transfer it and not transfer all the other random stuff we've done, like trying to write a book about creating a SaaS on AWS. It's pretty straightforward to do this.

Create a new account on AWS with an alias. So if your email is `ezrafurman@gmail.com` and your project is `awesomealbum` you'll make the email `ezrafurman+awesomealbum@gmail.com`. This allows you to have your one email still. You'll almost never log into this account after creating an organization. This account is literally just the top level account.

## Buy a domain from AWS

Go buy a domain from AWS. There are other providers. If you want to use them... This book is not for you. It's like $11. You need it now. Go do it. I'll wait.

Okay, got it? Great!

Let's get started.

## Extra Reading

- Get familiar with [SST](https://sst.dev/)
- Join the [SST Discord](https://sst.dev/discord)
