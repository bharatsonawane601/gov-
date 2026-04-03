
import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ title, description, image, url, type = 'website', jsonLd }) => {
  const siteTitle = 'Government Portal';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || window.location.href} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url || window.location.href} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default SEOHead;
