export interface IAffiliateProduct {
    _id: string;
    name: string;
    brand: string;
    description: string;
    image?: any;
    price: {
      current: number;
      original?: number;
      currency: string;
    };
    affiliateUrl: string;
    rating?: number;
    features: string[];
    category: string;
  }
  
  export interface IAffiliateLink {
    _id: string;
    url: string;
    platform: string;
    clicks: number;
    conversions: number;
    earnings: number;
  }


export interface IFormAffiliateLink {
  label: string;
  url: string;
}
  