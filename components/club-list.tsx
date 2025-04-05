"use client";

import ClubCard from "@/components/club-card";
import { Club } from "@/lib/data";

interface ClubListProps {
  clubs: Club[];
}

export default function ClubList({ clubs }: ClubListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {clubs.map((club) => (
        <ClubCard key={club.slug} club={club} />
      ))}
    </div>
  );
}