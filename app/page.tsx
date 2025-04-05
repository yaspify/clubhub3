import ClubList from "@/components/club-list";
import { clubs } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex w-full justify-center items-center mb-4">
        <h1 className="inline-block text-xl font-bold w-full">ClubHub3</h1>
        <Link href="/search" className={buttonVariants({ variant: "outline" })}>Search</Link>
      </div>
      <ClubList clubs={clubs} />
    </>
  )
}