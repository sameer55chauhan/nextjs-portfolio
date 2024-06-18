import { Redis } from "@upstash/redis";
import { allBookShelves } from "contentlayer/generated";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { Article } from "./article";
import { ReportView } from "./view";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function BookShelfPage() {
  const views =
    (await redis.get<number>(["pageviews", "bookshelf"].join(":"))) ?? 0;

  const sorted = allBookShelves
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <ReportView />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0 flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            My BookShelf
          </h2>
          <span
            title="View counter for this page"
            className={`duration-200 hover:font-medium flex items-center gap-1 text-white`}
          >
            <Eye className="w-5 h-5" />{" "}
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
          {/* <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p> */}
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((book) => (
                <Card key={book.slug}>
                  <Article book={book} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((book) => (
                <Card key={book.slug}>
                  <Article book={book} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((book) => (
                <Card key={book.slug}>
                  <Article book={book} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
