import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { z } from "zod";

import { create, read } from "@qrst-stack/core/task";

export const t = initTRPC.create();

const appRouter = t.router({
  create: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await create(input);
  }),
  read: t.procedure.input(z.string()).query(async ({ input }) => {
    return await read(input);
  }),
});

// export type definition of API
export type Router = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
