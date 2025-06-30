import { IProductSection } from "./product";
import { ITheme } from "./theme";

export interface IBlogAnalytics {
  views: number;
  uniqueViews: number;
  affiliateClicks: number;
  affiliateConversions: number;
  revenue: number;
  avgTimeOnPage: number;
  bounceRate: number;
  emailSignups: number;
  socialShares: number;
  comments: number;
  topTrafficSources: string[];
  topAffiliateProducts: string[];
  lastUpdated: string;
}

export interface IBlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: {
    name: string;
    image?: any;
  };
  coverImage?: any;
  images?: any[];
  date: string;
  excerpt?: string;
  content: any[];
  tags?: string[];
  category?: string;
  status: 'draft' | 'published';
  featured: boolean;
  readingTime: number;
  analytics: IBlogAnalytics;
  _createdAt: string;
  _updatedAt: string;
  publishedAt: string;
  numOfViews: number;
  numOfShares: number;
  hidden: boolean;
}

export interface IBlogPostsResponse {
  posts: IBlogPost[];
  total: number;
}

export interface IBlogFormData {
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  tags: string;
  products: IProductSection[];
  coverImage?: File;
}

export interface IBlogListItem {
  _id?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  publishedAt?: string;
  createdAt?: string;
  date?: string;
  _createdAt?: string;
  _updatedAt?: string;
  coverImage?: string;
  tags?: string[];
  hidden?: boolean;
  numOfViews?: number;
  numOfShares?: number;
  category?: string;
}

export interface IBlogListProps {
  data: IBlogListItem[];
  theme: ITheme;
  isAdmin?: boolean;
  authenticated?: boolean;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  filter?: any;
  setFilter?: (filter: any) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
  onToggleHidden?: (id: string, hidden: boolean) => void;
  deleteSuccess?: string;
  deleteError?: string;
  dismissAlert?: (type: 'success' | 'error') => void;
  hitEnd?: boolean;
  size?: number;
  setSize?: (size: number) => void;
}

export type BlogControlSortOptions =
  | 'relevant'
  | 'popularity'
  | 'date_desc'
  | 'date_asc'
  | 'title_asc'
  | 'title_desc';
