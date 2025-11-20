import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

if (!/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(`Invalid projectId format. projectId can only contain a-z, 0-9 and dashes. Got: ${projectId}`)
}

export default defineCliConfig({ api: { projectId, dataset } })

