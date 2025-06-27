export const blogFields = `
  _id,
  _type,
  title,
  category,
  'slug': slug.current,
  publishedAt,
  _updatedAt,
  tags,
  hidden,
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
