import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function profile() {
  const user = await getUser();

  return (
    <div className="flex flex-col gap-10 mt-20">
      <div className="flex flex-col gap-5">
        <p className="text-5xl text-center">✨{user.username}✨님</p>
        <p className="text-5xl text-center">환영합니다!</p>
      </div>
    </div>
  );
}
