"use client";

import { Input } from '@/components/ui/input';
import { tags } from '@/lib/data';
import { Club } from '@/lib/data';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import ClubList from "@/components/club-list";
import { useMemo } from 'react';

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
    <>
      <Input
        placeholder="Search..." className="w-full"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q')?.toString()}
      />
      <ul className='flex flex-wrap gap-2 mt-4'>
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
      </ul>
      <p>{filteredClubs.length}件みつかりました</p>
      <div className="mt-4">
        <ClubList clubs={filteredClubs} />
      </div>
    </>
  )
}