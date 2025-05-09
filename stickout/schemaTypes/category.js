export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Category Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'parent',
        title: 'Parent Category',
        type: 'reference',
        to: [{ type: 'category' }],
      }
    ]
  }
  