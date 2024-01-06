import { SSTConfig } from "sst";
import { Database } from "./stacks/Database";
import { Api } from "./stacks/Api";
import { SSRFunction } from "./stacks/Function";
import { Web } from "./stacks/Web";

export default {
  config(_input) {
    return {
      name: "qrst-stack",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Database).stack(Api).stack(SSRFunction).stack(Web);
  },
} satisfies SSTConfig;
