import { Function, StackContext } from "sst/constructs";

export function SSRFunction({ stack }: StackContext) {
  new Function(stack, "ssr-function", {
    handler: "src/lambda.handler",
  });

  return;
}
