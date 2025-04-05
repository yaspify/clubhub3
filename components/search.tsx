"use client";

import { Input } from '@/components/ui/input';
import { tags } from '@/lib/data';
import { Club } from '@/lib/data';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import ClubList from "@/components/club-list";
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SearchIcon, Tag, Users, Calendar, MapPin } from "lucide-react"

export default function Search({ clubs }: { clubs: Club[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  function handleTagClick(tag: string) {
    const params = new URLSearchParams(searchParams);
    const currentTags = params.get('tags')?.split(',').filter(Boolean) || [];

    if (currentTags.includes(tag)) {
      // Remove the tag if it's already selected
      const updatedTags = currentTags.filter(t => t !== tag);
      if (updatedTags.length > 0) {
        params.set('tags', updatedTags.join(','));
      } else {
        params.delete('tags');
      }
    } else {
      // Add the tag if it's not selected
      currentTags.push(tag);
      params.set('tags', currentTags.join(','));
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // Check if a tag is currently selected
  function isTagSelected(tag: string): boolean {
    return searchParams.get('tags')?.includes(tag) ?? false;
  }

  // Filter clubs based on search parameters
  const filteredClubs = useMemo(() => {
    let result = [...clubs];

    // Filter by search term
    const searchTerm = searchParams.get('q')?.toLowerCase();
    if (searchTerm) {
      result = result.filter(club =>
        club.clubName.toLowerCase().includes(searchTerm) ||
        (club.activityDetails?.summary?.toLowerCase().includes(searchTerm)) ||
        (club.secretDescription?.toLowerCase().includes(searchTerm))
      );
    }

    // Filter by tags
    const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    if (selectedTags.length > 0) {
      result = result.filter(club =>
        club.tags?.some(tag => selectedTags.includes(tag))
      );
    }

    return result;
  }, [searchParams]);

  return (
    <div className='space-y-6'>
      {/* <Input
        placeholder="Search..." className="w-full"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q')?.toString()}
      /> */}


      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          placeholder="サークルを名前や活動内容でさがす"
          className="pl-10 h-12 text-base rounded-xl border-muted-foreground/20 focus-visible:ring-offset-2"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* <ul className='flex flex-wrap gap-2 mt-4'>
        {tags.map((tag) => (
          <li
            key={tag}
            className={`${isTagSelected(tag)
              ? "bg-gray-800 text-white"
              : "bg-transparent text-gray-800 border border-gray-800"
              } text-sm rounded-full px-4 py-1 cursor-pointer hover:opacity-80`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </li>
        ))}
      </ul> */}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">キーワードでさがす</h3>
        </div>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full px-4 py-1 text-sm font-medium cursor-pointer transition-all hover:opacity-90",
                  isTagSelected(tag)
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-transparent text-gray-800 border border-gray-800 hover:bg-gray-100",
                )}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{filteredClubs.length}</span> 件みつかりました
      </p>

      <ClubList clubs={filteredClubs} />
    </div>
  )
}