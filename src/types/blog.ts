import { IProductSection } from "./product";

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
}

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

export type BlogControlSortOptions =
  | 'relevant'
  | 'popularity'
  | 'date_desc'
  | 'date_asc'
  | 'title_asc'
  | 'title_desc';
