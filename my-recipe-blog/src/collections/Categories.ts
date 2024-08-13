import { CollectionConfig } from 'payload/types';

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      hooks: {
        beforeChange: [
          ({ data }) => {
            data.slug = data.name.toLowerCase().replace(/ /g, '-');
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
};

export default Categories;
