import { Metadata } from 'next'

import { METADATA_SUFFIX } from '@/app/constants'

export const generatePageMetadata = (
  uniqueTitle: string,
  description: string,
): Metadata => ({
  title: `${uniqueTitle} ${METADATA_SUFFIX}`,
  description: description,
})
