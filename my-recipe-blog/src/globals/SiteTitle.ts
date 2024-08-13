import { GlobalConfig } from 'payload/types';

const SiteTitle: GlobalConfig = {
  slug: 'site-title',
  label: 'Site Title',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
};

export default SiteTitle;
