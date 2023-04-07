import React from 'react';
import Head from 'next/head'

export default function HeadersContainer({ data, title, desc, socialtitle, socialimages, socialdesc, scdinfo }) {
	return (
		<Head>
      <script
        key="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={data}
      />
      <title>{title ? `${title} - shiglam` : 'shiglam '}</title>
        {desc && <meta 
          name="description" 
          charset="UTF-8" 
          content={desc}
          key="desc"
        />}
        <meta name="google-site-verification" content="tK9s0pQ66YNPGPxWplFwgCSa8dlOmhBlJLmRr_ZLLTM" />
        {socialtitle && <meta 
          property="og:title" 
          content={socialtitle}
        />}
        {socialdesc && <meta
          property="og:description"
          content={socialdesc}
        />}
        {socialimages && <meta
          property="og:image:secure_url"
          content={socialimages}
        />}
        {scdinfo && <script
          type="application/ld+json"
          dangerouslySetInnerHTML={scdinfo}
          key="product-jsonld"
        />}
        <link rel="icon" href="/shiglama.png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
    </Head>
	)
}

