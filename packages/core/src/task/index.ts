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
