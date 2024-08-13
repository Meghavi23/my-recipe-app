
import { selfOrAdmin } from '../access/selfOrAdmin';
import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: selfOrAdmin,
    create: () => true,
    update: selfOrAdmin,
    delete: ({ req: { user } }) => {
      if (user?.collection === 'users') {
        return true;
      }
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      required: true,
    },
  ],
};

export default Users;
