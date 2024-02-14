import { AstroSite, StackContext } from "sst/constructs";

export async function DocsStack({ stack }: StackContext) {
  // Create the Astro site
  const site = new AstroSite(stack, "DocsSite", {
    path: "apps/docs",
  });

  // Show the endpoint in the output
  stack.addOutputs({
    // ApiEndpoint: api.url,
    // S3BucketURL: bucketURL || "",
  });
}
