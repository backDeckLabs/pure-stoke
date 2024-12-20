/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { PsSeoKeys } from '@/types/seo-types'
import Head from 'next/head'
import React, { FC } from 'react'

const DefaultMetaTags: FC = () => {
  const defaultSeo = {
    title: 'Pure Stoke',
    description: 'Gratitude, every moment possible.',
    image: '/assets/logos/Logo_dark.jpg',
    siteName: 'Pure Stoke',
  }

  return (
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      {/* <meta name="google-site-verification" content="google972c07996b23ef3d" /> */}
      <link rel="preconnect" href="us-west-2.graphassets.com" />
      <link rel="preconnect" href="graphassets.com" />
      <link
        rel="icon"
        type="image/png"
        href="/assets/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
      <link rel="shortcut icon" href="/assets/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content={defaultSeo.title} />
      <link rel="manifest" href="/assets/site.webmanifest" />
      <title key={PsSeoKeys.Title}>{defaultSeo.title}</title>
      <meta
        key={PsSeoKeys.OgTitle}
        property="og:title"
        content={defaultSeo.title}
      />
      <meta
        key={PsSeoKeys.Description}
        name="description"
        content={defaultSeo.description}
      />
      <meta
        key={PsSeoKeys.OgDescription}
        property="og:description"
        content={defaultSeo.description}
      />
      <meta
        key={PsSeoKeys.OgImage}
        property="og:image"
        content={defaultSeo.image}
      />
      <meta
        key={PsSeoKeys.OgImageWidth}
        property="og:image:width"
        content="1200"
      />
      <meta
        key={PsSeoKeys.OgImageHeight}
        property="og:image:height"
        content="630"
      />
      <meta
        key={PsSeoKeys.TwitterCard}
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key={PsSeoKeys.OgUrl}
        property="og:url"
        content="https://www.ghostnote.com"
      />
      <meta property="og:type" content="website" />
      <meta key="og:locale" property="og:locale" content="en_US" />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={defaultSeo.siteName}
      />
      {/* <meta name="twitter:site" content="Pure Stoke"> */}

      {/* Structured data for schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: defaultSeo.title,
            description: defaultSeo.description,
            url: 'https://purestoke.life',
            image: 'https://purestoke.life/logos/standard-logo-512.png',
          }),
        }}
      />
    </Head>
  )
}

export default DefaultMetaTags
