import path from 'path';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';
import Users from './collections/Users';
import Categories from './collections/Categories';
import Recipes from './collections/Recipes';
import SiteDescription from './globals/SiteDescription';
import SiteTitle from './globals/SiteTitle';
import SocialMediaLinks from './globals/SocialMediaLinks';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Recipes, Categories],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  globals: [SiteTitle, SiteDescription, SocialMediaLinks],
  upload: {
    staticDir: path.resolve(__dirname, 'uploads'),
  },
});
