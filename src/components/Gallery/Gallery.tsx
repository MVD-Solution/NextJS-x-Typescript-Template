import React, { useEffect } from 'react';
import Image from 'next/image';
import Artwork from './Artwork';
import {
  useStates as usePostStates,
  useActions as usePostActions,
} from '@/slices/PostSlice';
import { PostTypes } from '@/custom-types';
import { fetchPosts } from '@/services/post';

const Gallery = () => {
  const { posts } = usePostStates();
  const { fetchAllPosts } = usePostActions();
  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(posts);

  return (
    <div id="gallery" className="min-h-screen snap-start ">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 flex flex-col gap-10">
        <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6x text-center dark:text-gray-100">
          Community Gallery
        </div>
        <div className="grid grid-cols-1 place-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {posts.data.map((post: PostTypes, index) => {
            console.log(post);
            return (
              <ArtWorkWrapper
                key={index}
                src={post.photo}
                prompt={post.prompt}
                artist={post.artist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ArtWorkWrapper = ({
  src,
  prompt,
  artist,
}: {
  src: string;
  prompt: string;
  artist: string;
}) => (
  <div className="h-72 w-72 relative">
    <Artwork src={src} prompt={prompt} artist={artist} />
  </div>
);

export default Gallery;
