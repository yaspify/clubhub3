"use client";

import { usePathname } from "next/navigation";
import { clubs } from "@/lib/data";

export default function Page() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const club = clubs.find((club) => club.slug === slug);
  if (!club) {
    return <div>Club not found</div>;
  } else {
    return (
      <div>
        <h1>{club.clubName}</h1>
      </div>  
    );
  }
}