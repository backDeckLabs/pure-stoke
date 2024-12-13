import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Prevent prview mode if request doesn't contain correct query param secret
  if (req.query.secret !== process.env.NEXT_PUBLIC_HYGRAPH_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Enable dynamic preview data on requests
  res.setPreviewData({})

  // Set redirect location
  const slug = req.query.slug as string
  const pathPrefix = slug?.startsWith('/') ? '' : '/'
  const redirectPath = `${pathPrefix}${req.query.slug || ''}`
  res.writeHead(307, { Location: redirectPath })

  res.end()
}
