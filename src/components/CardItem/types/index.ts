interface ICardItemLink {
    href: string;
    as?: string;
}
  
interface ICardItemProps {
    title?: string;
    subtitle?: string;
    image?: any;
    date?: string;
    link?: ICardItemLink;
    theme?: any;
    tags?: string[];
    isAdmin?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    numOfViews?: number;
    numOfShares?: number;
}