import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import TweetList from "../components/tweet-list";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      user: true,
      tweet: true,
      created_at: true,
      Like: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <div>
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
