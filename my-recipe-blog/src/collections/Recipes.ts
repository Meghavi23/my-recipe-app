import { CollectionConfig } from 'payload/types';

const Recipes: CollectionConfig = {
  slug: 'recipes',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'ingredients',
      type: 'array',
      fields: [
        {
          name: 'ingredient',
          type: 'text',
        },
      ],
    },
    {
      name: 'instructions',
      type: 'richText',
    },
    {
      name: 'cookTime',
      type: 'number',
    },
    {
      name: 'prepTime',
      type: 'number',
    },
    {
      name: 'servings',
      type: 'number',
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        {
          label: 'Easy',
          value: 'easy',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Hard',
          value: 'hard',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
};

export default Recipes;
