import { StackContext, use, StaticSite } from "sst/constructs";
import { Api } from "./Api";

export function Web({ stack }: StackContext) {
  const api = use(Api);

  const site = new StaticSite(stack, "site", {
    path: "packages/web",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.customDomainUrl || api.url,
    },
  });

  stack.addOutputs({
    SITE: site.url || "https://localhost:3000",
    VITE_API_URL: api.customDomainUrl || api.url,
  });

  return api;
}
