import { GlobalConfig } from 'payload/types';

const SiteDescription: GlobalConfig = {
  slug: 'site-description',
  label: 'Site Description',
  fields: [
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
};

export default SiteDescription;
