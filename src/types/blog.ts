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
  featured: unknown;
  _id: string;
  _type?: 'blog';
  title: string;
  slug: string;
  subtitle?: string;

  coverImage?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
    [key: string]: any;
  };

  tags?: string[];
  hidden: boolean;
  publishedAt: string;
  _createdAt: string;
  _updatedAt: string;

  numOfViews: number;
  numOfShares: number;

  category?: {
    title: string;
    value: string;
  };

  sections?: Array<{
    _key: string;
    _type: 'content' | 'product';
    name?: string | null;
    image?: any;
    description?: string | null;
    content?: any[] | null;
    affiliateLinks?: Array<{
      label: string;
      url: string;
      clicks: number;
    }> | null;
  }>;
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
export interface IBlogListProps {
  data: IBlogPost[];
  theme?: ITheme;
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
