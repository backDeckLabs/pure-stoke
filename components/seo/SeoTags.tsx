import { SITE_NAME } from '@/lib/constants'
import { PsSeoKeys } from '@/types/seo-types'
import Head from 'next/head'
import React, { FC } from 'react'

export interface SeoTagsProps {
  /** SEO Title */
  title?: string
  /** Whether or not to use the global title template */
  titleTemplate?: boolean
  /** Description SEO  */
  description?: string
  /** Image URL to use for SEO Image */
  image?: string
  /** Twitter card size to use for SEO */
  twitterCard?: string
  /** Label 1 */
  label1?: string
  /** Data 1 */
  data1?: string
  /** Label 2 */
  label2?: string
  /** Data 2 */
  data2?: string
}

const SeoTags: FC<SeoTagsProps> = ({
  title,
  titleTemplate = true,
  description,
  image,
  label1,
  data1,
  label2,
  data2,
}) => {
  const fullTitle = `${title} | ${SITE_NAME}`

  return (
    <Head>
      {title ? (
        <>
          <title key={PsSeoKeys.Title}>
            {titleTemplate ? fullTitle : title}
          </title>
          <meta key={PsSeoKeys.OgTitle} property="og:title" content={title} />
        </>
      ) : null}
      {description ? (
        <>
          <meta
            key={PsSeoKeys.Description}
            name="description"
            content={description}
          />
          <meta
            key={PsSeoKeys.OgDescription}
            property="og:description"
            content={description}
          />
        </>
      ) : null}
      {image ? (
        <meta key={PsSeoKeys.OgImage} property="og:image" content={image} />
      ) : null}
      {label1 && data1 ? (
        <>
          <meta key={PsSeoKeys.Label1} name="twitter:label1" content={label1} />
          <meta key={PsSeoKeys.Data1} name="twitter:data1" content={data1} />
        </>
      ) : null}
      {label2 && data2 ? (
        <>
          <meta key={PsSeoKeys.Label2} name="twitter:label2" content={label2} />
          <meta key={PsSeoKeys.Data2} name="twitter:data2" content={data2} />
        </>
      ) : null}
    </Head>
  )
}

export default SeoTags
