import { Metadata } from 'next';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function generateMetadata({
  title = 'Portfolio Website',
  description = 'A personal portfolio website with blog, projects, and resume builder',
  keywords = 'portfolio, blog, projects, resume, developer',
  image = '/images/og-image.jpg',
  url,
  type = 'website',
}: MetaTagsProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      type,
      title,
      description,
      images: [
        {
          url: fullImageUrl,
        },
      ],
      url: fullUrl,
      siteName: 'Portfolio Website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}