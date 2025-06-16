// schemas/blog.ts
export default {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'string'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text'
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{type: 'block'}]
      },
      {
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime'
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{type: 'string'}]
      }
    ]
  }