import React from 'react';
import Head from 'next/head'

function HeadersContainer({ data }) {
	return (
		<Head>
            <script
              key="product-jsonld"
              type="application/ld+json"
              dangerouslySetInnerHTML={data}
            />
        </Head>
	)
}

export default HeadersContainer