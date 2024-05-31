"use server";

import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      user: true,
      tweet: true,
      created_at: true,
      Like: true,
      id: true,
    },
    skip: 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
