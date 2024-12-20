export const isDev = () => process.env.NEXT_PUBLIC_SITE_ENV === 'development'
export const isStaging = () => process.env.NEXT_PUBLIC_SITE_ENV === 'staging'
export const isProduction = () =>
  process.env.NEXT_PUBLIC_SITE_ENV === 'production'
