import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const user = await db.user.create({
    data: {
      username: "zzz",
      email: "adf",
      password: "123",
      bio: "234",
      created_at: "123",
      updated_at: "111",
    },
  });
}

test();

export default db;
