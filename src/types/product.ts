import { IFormAffiliateLink } from "./affiliate";

export interface IProductSection {
    name: string;
    description: string;
    image?: File;
    imagePreview?: string;
    affiliateLinks: IFormAffiliateLink[];
  }