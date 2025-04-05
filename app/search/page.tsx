"use client"

import Search from "@/components/search";
import { clubs } from "@/lib/data";
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-bold">Search</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Search clubs={clubs} />
      </Suspense>
    </>
  )
}