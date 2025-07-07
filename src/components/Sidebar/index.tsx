import React from 'react';
import { IBlogPost } from 'types/blog';
import { PostListSection } from './PostListSection';
import { CategoryList } from './CategoryList';

interface Category {
  label: string;
  count: number;
  icon?: string;
}

interface SidebarProps {
  topPosts: IBlogPost[];
  trending: IBlogPost[];
  popular: IBlogPost[];
  categories: Category[];
  onPostClick?: (post: IBlogPost) => void;
  mode?: 'default' | 'top' | 'trending' | 'popular'; // extend as needed
}

export const Sidebar: React.FC<SidebarProps> = ({
  topPosts,
  trending,
  popular,
  categories,
  onPostClick,
  mode = 'default'
}) => {
  return (
    <aside>
      {(mode === 'default' || mode === 'top') && (
        <PostListSection title="Top Posts" posts={topPosts} onItemClick={onPostClick} />
      )}

      {(mode === 'default' || mode === 'trending') && (
        <PostListSection title="Trending Products" posts={trending} onItemClick={onPostClick} />
      )}

      {(mode === 'default' || mode === 'popular') && (
        <PostListSection title="Popular Products" posts={popular} onItemClick={onPostClick} />
      )}

      {/* <CategoryList categories={categories} /> */}
    </aside>
  );
};
