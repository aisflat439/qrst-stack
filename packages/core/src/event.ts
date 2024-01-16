import { createEventBuilder, ZodValidator } from "sst/node/event-bus";

export const event = createEventBuilder({
  bus: "bus",
  validator: ZodValidator,
});

const params = {
  TableName,
  KeyConditionExpression: "#DDB_gsi1pk = :pkey",
  ExpressionAttributeNames: {
    "#DDB_gsi1pk": "gsi1pk",
  },
  ExpressionAttributeValues: {
    ":pkey": "$reddit#postid_01g90z3224mwpk1jy830wc0wwr",
  },
};
