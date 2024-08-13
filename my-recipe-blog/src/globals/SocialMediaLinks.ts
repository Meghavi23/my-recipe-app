import { GlobalConfig } from 'payload/types';

const SocialMediaLinks: GlobalConfig = {
  slug: 'social-media-links',
  label: 'Social Media Links',
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
};

export default SocialMediaLinks;
