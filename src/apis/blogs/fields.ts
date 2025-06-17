export const blogFields = `
  _id,
  _type,
  title,
  subtitle,
  'slug': slug.current,
  publishedAt,
  tags,
  numOfViews,
  numOfShares,
  coverImage {
    asset->{
      _id,
      url
    }
  },
  sections[] {
    _type,
    _key,
    content[] {
      ..., 
      children[] {
        ..., 
        marks[]
      }
    },
    name,
    description,
    affiliateLinks[] {
      label,
      url,
      clicks
    },
    image {
      asset->{
        _id,
        url
      }
    }
  }
`;