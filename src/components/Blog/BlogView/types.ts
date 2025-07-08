export interface BlogSection {
  _type: 'content' | 'product' | 'image';
  _key?: string;
  name?: string;
  content?: any;
  description?: any;
  imagePreview?: string;
  image?: { asset?: { url: string } };
  affiliateLinks?: { label: string; url: string; clicks?: number }[];
  width?: number;
  height?: number;
}

export interface BlogViewProps {
  title: string;
  date?: string;
    category?: {
        title: string;
        value: string;
    };
  sections: BlogSection[];
  isPreview?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
