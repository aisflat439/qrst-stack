export async function create(input: string) {
  return await Promise.resolve({
    id: "1",
    text: input,
    completed: false,
  });
}

export async function read(id: string) {
  return await Promise.resolve({
    id: "1",
    text: "hello",
    completed: false,
  });
}

const params = {
  TableName,
  KeyConditionExpression: "#DDB_pk = :pkey and #DDB_sk Contains :skey",
  ExpressionAttributeNames: {
    "#DDB_pk": "pk",
    "#DDB_sk": "sk",
  },
  ExpressionAttributeValues: {
    ":pkey": "$reddit",
    ":skey": "$reddit#redditor_1#redditorid_01g90z1ba7d8q91x8v9s8ahpf9",
  },
};

const params = {
  TableName,
  KeyConditionExpression: "#DDB_pk = :pkey and begins_with(#DDB_sk, :skey)",
  ExpressionAttributeNames: {
    "#DDB_pk": "pk",
    "#DDB_sk": "sk",
  },
  ExpressionAttributeValues: {
    ":pkey": "$reddit",
    ":skey": "$reddit#redditor_1#redditorid",
  },
};

const params = {
  TableName,
  KeyConditionExpression:
    "#DDB_gsi2pk = :pkey and begins_with(#DDB_gsi2sk, :skey)",
  ExpressionAttributeNames: {
    "#DDB_gsi2pk": "gsi2pk",
    "#DDB_gsi2sk": "gsi2sk",
  },
  ExpressionAttributeValues: {
    ":pkey": "$reddit",
    ":skey": "$allposts#post",
  },
};

const params = {
  TableName,
  KeyConditionExpression:
    "#DDB_gsi2pk = :pkey and begins_with(#DDB_gsi2sk, :skey)",
  ExpressionAttributeNames: {
    "#DDB_gsi2pk": "gsi2pk",
    "#DDB_gsi2sk": "gsi2sk",
  },
  ExpressionAttributeValues: {
    ":pkey": "$reddit",
    ":skey": "$allposts#post_1#postid_01g90z3gtjrbdc9qkd9p059qwe",
  },
};
