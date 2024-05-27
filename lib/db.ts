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
  console.log(user);
}

test();

export default db;
