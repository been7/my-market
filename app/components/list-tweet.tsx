import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface ListTweetProps {
  user: {
    id: number;
    username: string;
    password: string;
    email: string;
    bio: string | null;
    created_at: Date;
    updated_at: Date;
  };
  tweet: string;
  created_at: Date;
  Like: { id: number; created_at: Date; userId: number; tweetId: number }[];
  id: number;
  key: number;
}

export default function ListTweet({
  user,
  tweet,
  created_at,
  Like,
  id,
}: ListTweetProps) {
  return (
    <Link
      href={`/${id}`}
      className="flex gap-5 flex-col border-neutral-500 border p-2"
    >
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{user.username}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
        {/* <span className="text-lg font-semibold">{Like.}</span> */}
      </div>
      <div>
        <span>{tweet}</span>
      </div>
    </Link>
  );
}
