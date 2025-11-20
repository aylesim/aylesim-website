import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import post from './src/sanity/schemas/post'
import project from './src/sanity/schemas/project'

export default defineConfig({
  name: 'default',
  title: 'Aylesim Website',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [structureTool()],

  schema: {
    types: [post, project],
  },
})

